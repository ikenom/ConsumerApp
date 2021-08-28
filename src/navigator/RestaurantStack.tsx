import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RestaurantNavigatorContainer, RestaurantViewProps } from '../components/pages/order/Restaurant';
import { OrderConfirmationCartContainer, OrderConfirmationCartProps } from '../components/pages/order/Cart';
import { ConfirmationNavigatorContainer, OrderConfirmationProps } from '../components/pages/order/Confirmation';
import { MealNavigatorContainer, MealViewProps } from '../components/pages/order/Meal';

export type RestaurantParamList = {
  RestaurantView: RestaurantViewProps
  MealView: MealViewProps
  CartView: OrderConfirmationCartProps
  ConfirmationView: OrderConfirmationProps
}
 
// TODO May make more sense to call this MealStack
export const RestaurantStackScreens = () => {
  const RestaurantStack = createStackNavigator<RestaurantParamList>();
  return (
    <RestaurantStack.Navigator screenOptions={{ headerShown: false }}>
      <RestaurantStack.Screen name="RestaurantView" component={RestaurantNavigatorContainer} />
      <RestaurantStack.Screen name="MealView" component={MealNavigatorContainer} />
      <RestaurantStack.Screen name="CartView" component={OrderConfirmationCartContainer} />
      <RestaurantStack.Screen name='ConfirmationView' component={ConfirmationNavigatorContainer} />
    </RestaurantStack.Navigator>
  );
}