import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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

export const HomeStackScreens = () => {
  
  const HomeStack = createStackNavigator<HomeStackParamList>();

  const restaurantStore = RestaurantStore.getInstance();
  const orderStore = OrderStore.getInstance();
  const userStore = UserStore.getInstance();
  
  // PLACEHOLDER Fake fns to be replaced with getting real data
  const getDummySlideshowImages = () => MOCK_MEALS.map((meal) => meal.image);

  const enrichMeals = (meals: Meal[]): EnrichedMeal[] => {
    let mealCardData = [];
    for (let i = 0; i < meals.length; i++) {
      const restaurant = restaurantStore.getRestaurantById(meals[i].restaurantId)
      const isFlagged = userStore.isFlaggedIngredient(meals[i])
      mealCardData.push({
        ...meals[i],
        restaurantName: restaurant?.name,
        isFlaggedIngredient: isFlagged
      })
    }
    return mealCardData
  }
  const loadHomeData = (): HomeViewProps => {
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