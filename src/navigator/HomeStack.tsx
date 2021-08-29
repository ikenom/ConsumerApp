import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { HomeNavContainer, HomeViewProps } from '../components/pages/navigation/Home';
import { SeeAsTilesProps, SeeAsTilesNavContainer } from '../components/pages/navigation/SeeAsTiles';
import { RestaurantParamList, RestaurantStackScreens } from './RestaurantStack';
import { NavigatorScreenParams } from '@react-navigation/core';
import { MOCK_MEALS } from '../models/meal/util'; // TEMP
import RestaurantStore from '../store/restaurantStore';
import UserStore from '../store/userStore';
import { Meal, EnrichedMeal } from '../models/meal/meal';
import OrderStore from '../store/orderStore';

export type HomeStackParamList = {
  Home: HomeViewProps;
  SeeAsTiles: SeeAsTilesProps
  Notifications: undefined;
  RestaurantStack: NavigatorScreenParams<RestaurantParamList>;
}

export const loadHomeData = (): HomeViewProps => {

  const restaurantStore = RestaurantStore.getInstance();
  const orderStore = OrderStore.getInstance();
  const userStore = UserStore.getInstance();

  // PLACEHOLDER Fake fns to be replaced with getting real data
  const getDummySlideshowImages = () => MOCK_MEALS.map((meal) => meal.image);

  const enrichMeals = (meals: Meal[]): EnrichedMeal[] => {
    const mealCardData = meals.map((meal, i) => {
      const restaurant = restaurantStore.getRestaurantById(meal.restaurantId)
      const isFlagged = userStore.isFlaggedIngredient(meal)
      const containsExcluded = userStore.containsExcludedIngredients(meal)
      return {
        ...meal,
        restaurantName: restaurant?.name,
        isFlaggedIngredient: isFlagged,
        containsExcludedIngredients: containsExcluded
      } as EnrichedMeal
    })
    return mealCardData
  }

  return {
    locationName: userStore.getLocation(),
    slideshowImages: getDummySlideshowImages(),
    meals: {
      new: enrichMeals(restaurantStore.getNewMeals()),
      popular: enrichMeals(restaurantStore.getPopularMeals()),
      orderAgain: enrichMeals(orderStore.getOrderAgainMeals())
    }
  }
}

export const HomeStackScreens = () => {
  
  const HomeStack = createStackNavigator<HomeStackParamList>();

  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="Home"
        component={HomeNavContainer}
        initialParams={loadHomeData()} />
      <HomeStack.Screen name="SeeAsTiles" component={SeeAsTilesNavContainer} />
      <HomeStack.Screen name="RestaurantStack" component={RestaurantStackScreens} />
    </HomeStack.Navigator>
  );
}

export const navigateToHome = (navigation: StackNavigationProp<HomeStackParamList> | undefined) => {
  if (navigation) {
    navigation?.push("Home", loadHomeData())
  }
  else {
    console.log("navigateToHome: navigation was undefined")
  }
}

export const navigateToRestaurant = (navigation: StackNavigationProp<HomeStackParamList> | undefined) => {
  if (navigation) {
    const restaurantStore = RestaurantStore.getInstance();
    const restaurants = restaurantStore.getRestaurants().get()
    const restaurant = restaurants[0] // TEMP Show first restaurant for demo
    navigation?.push("RestaurantStack", {
      screen: "RestaurantView",
      params: {
        restaurant: restaurant,
        meals: {
          all: restaurant.meals,
          recommendations: restaurant.meals
        }
      }
    })
  }
  else {
    console.log("navigateToRestaurant: navigation was undefined")
  }
}