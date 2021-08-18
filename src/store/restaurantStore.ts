import { State, createState } from '@hookstate/core';
import { DateTime } from 'luxon';
import { getRestaurantsAsync } from '../api/restaurant_client';
import { Meal } from '../models/meal/meal';
import { MOCK_MEALS_ALL_INFO } from '../models/meal/util'; // TEMP
import { Restaurant } from '../models/restaurant/restaurant';

export default class RestaurantStore {
  private static instance: RestaurantStore

  private restaurants: State<Array<Restaurant>>

  private _isLoading: State<Boolean>;

  static init = async () => {
    RestaurantStore.getInstance()
  }

  static getInstance(): RestaurantStore {
    if (!RestaurantStore.instance) {
      RestaurantStore.instance = new RestaurantStore();
    }

    return RestaurantStore.instance;
  }

  private constructor() {
    this.restaurants = createState<Array<Restaurant>>([])
    this._isLoading = createState<Boolean>(false) // Allows us to render skeleton component
  }

  getRestaurants = () => {
    return this.restaurants
  }

  getRestaurantsAsync = async () => {
    let cursor: String = null
    let hasNext = true
    this._isLoading.set(true)
    const restaurants = []

    while(hasNext) {
      const result = await getRestaurantsAsync(cursor)
      restaurants.push(...this.getRestaurantsFromPayload(result))

      hasNext = result.pageInfo.hasNextPage
      cursor = result.pageInfo.endCursor
    }

    this.restaurants.set(restaurants)
    this._isLoading.set(false)
  }

  getRestaurantFromPayload = (node): Restaurant => ({
    id: node.id,
    name: node.businessName,
    description: node.description,
    image: node.imageUrl ? node.imageUrl : require('../../assets/testImages/HarlemTavern.png'),
    phoneNumber: node.phoneNumber,
    location: {
      state: node.location.state,
      city: node.location.city,
      zipCode: node.location.zipCode,
      street: node.location.street
    },
    businessHours: {
      openingTime: DateTime.fromISO(node.businessHours.openTime).toFormat('hh:mm a'),
      closingTime: DateTime.fromISO(node.businessHours.closeTime).toFormat('hh:mm a')
    },
    meals: this.getMealsFromPayload(node.meals, node.id, this.getDummyDistance())
  })

  // TEMP Delete once distance is added to restaurant
  getDummyDistance = () => {
    const dist = Math.random() * 10
    return dist.toFixed(1)
  }

  getRestaurantsFromPayload = (payload: any): Restaurant[] => {
    return payload.edges.map(edge => this.getRestaurantFromPayload(edge.node));
  }

  getMealsFromPayload = (payload: any[], restaurantId: string, distance: string): Meal[] => {
    // Extract Meal data from payload, add info restaurantId and distance in
    return payload.map(meal => ({
      id: meal.id,
      image: `https:${meal.imageUrl}`,
      name: meal.name,
      restaurantId,
      distance, 
      price: meal.price,
      description: meal.description,
      nutrition: {
        calories: meal.nutrition.calories,
        macros: {
          proteinInGrams: meal.nutrition.proteinInG,
          carbsInGrams: meal.nutrition.carbsInG,
          fatsInGrams: meal.nutrition.fatsInG
        }
      }
    }))
  }

  getRestaurantById = (restaurantId: string): (Restaurant | null) => {
    const restaurants = this.restaurants.get()
    const foundRestaurant = restaurants.find(r => r.id === restaurantId)
    if (foundRestaurant) {
      console.log("Found " + foundRestaurant.name + "with ID " + restaurantId)
      return foundRestaurant
    }
    else {
      return null
    }
  }

  // TEMP
  getDummyCarouselMeals = (): Meal[] => {
    const restaurants = this.restaurants.get()
    return restaurants[0].meals.concat(MOCK_MEALS_ALL_INFO); // Combo of backend and mock data
  }

  getNewMeals = (): Meal[] => {
    return this.getDummyCarouselMeals() // PLACEHOLDER
  }

  getPopularMeals = (): Meal[] => {
    return this.getDummyCarouselMeals() // PLACEHOLDER
  }
}