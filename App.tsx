import React from 'react';
import { SafeAreaView } from 'react-native';
import { MealNavigatorContainer, MealOrderView, MealViewProps } from './src/components/pages/order/Meal';
import { defaultTheme } from './src/defaultTheme';
import { MOCK_MEALS } from './src/models/meal/util';
import { MOCK_RESTAURANT } from './src/models/restaurant/util';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import StorybookUIRoot from './storybook';
import { RestaurantNavigatorContainer, RestaurantViewProps } from './src/components/pages/order/Restaurant';
import { OrderConfirmationCart } from './src/components/pages/order/Cart';

export type RestaurantParamList = {
  RestaurantView: RestaurantViewProps
  MealView: MealViewProps
}

const RestaurantStack = createStackNavigator<RestaurantParamList>();

const App = () => {
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: defaultTheme.colors.black}}/>
      <SafeAreaView style={{flex: 1, backgroundColor: defaultTheme.colors.black}}>
      <NavigationContainer>
        <RestaurantStack.Navigator initialRouteName={'RestaurantView'} screenOptions={{headerShown: false}}>
          <RestaurantStack.Screen name="RestaurantView" component={RestaurantNavigatorContainer} initialParams={{restaurant: MOCK_RESTAURANT, meals: {all: MOCK_MEALS, recommendations: MOCK_MEALS}}}/>
          <RestaurantStack.Screen name="MealView" component={MealNavigatorContainer}/>
        </RestaurantStack.Navigator>
      </NavigationContainer>
      </SafeAreaView>
    </>
  )
};

const TestApp = () => {
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: defaultTheme.colors.black}}/>
      <SafeAreaView style={{flex: 1, backgroundColor: defaultTheme.colors.black}}>
        <OrderConfirmationCart restaurant={MOCK_RESTAURANT} meal={MOCK_MEALS[0]}/>
      </SafeAreaView>
    </>
  )
};


const Storybook = () => {
  return <StorybookUIRoot />;
};

export default App;
