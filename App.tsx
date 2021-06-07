import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { MealNavigatorContainer, MealOrderView, MealViewProps } from './src/components/pages/order/Meal';
import { defaultTheme } from './src/defaultTheme';
import { MOCK_MEALS } from './src/models/meal/util';
import { MOCK_RESTAURANT } from './src/models/restaurant/util';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, StyleSheet } from 'react-native';

import StorybookUIRoot from './storybook';
import { RestaurantNavigatorContainer, RestaurantViewProps } from './src/components/pages/order/Restaurant';
import { OrderConfirmationCart, OrderConfirmationCartProps } from './src/components/pages/order/Cart';

export type RestaurantParamList = {
  RestaurantView: RestaurantViewProps
  MealView: MealViewProps
  CartView: OrderConfirmationCartProps
}

const RestaurantStack = createStackNavigator<RestaurantParamList>();

const platformVersion = Platform.Version;


const App = () => {
  const insets = useSafeAreaInsets();
  const iosStyles = parseFloat(platformVersion as unknown as string) > 10 ?
  {
    paddingTop: insets.top
  } :
  {
    paddingTop: 0
  }
  return (
    <View style={{ ...iosStyles, flex: 1, paddingRight: insets.right ,paddingLeft: insets.left, backgroundColor: defaultTheme.colors.black}} >
      <StatusBar barStyle={'light-content'}/>
      <NavigationContainer>
        <RestaurantStack.Navigator initialRouteName={'RestaurantView'} screenOptions={{headerShown: false}}>
          <RestaurantStack.Screen name="RestaurantView" component={RestaurantNavigatorContainer} initialParams={{restaurant: MOCK_RESTAURANT, meals: {all: MOCK_MEALS, recommendations: MOCK_MEALS}}}/>
          <RestaurantStack.Screen name="MealView" component={MealNavigatorContainer}/>
        </RestaurantStack.Navigator>
      </NavigationContainer>
    </View>
  )
};

const TestApp = () => {
  const insets = useSafeAreaInsets();
  const iosStyles = parseFloat(platformVersion as unknown as string) > 10 ?
  {
    paddingTop: insets.top
  } :
  {
    paddingTop: 0
  }
  return (
    <View style={{ ...iosStyles, flex: 1, paddingRight: insets.right ,paddingLeft: insets.left, backgroundColor: defaultTheme.colors.black}} >
      <StatusBar barStyle={'light-content'}/>
      <SafeAreaView style={{flex: 0, backgroundColor: defaultTheme.colors.black}}/>
      <SafeAreaView style={{flex: 1, backgroundColor: defaultTheme.colors.black}}>
        <OrderConfirmationCart restaurant={MOCK_RESTAURANT} meal={MOCK_MEALS[0]}/>
      </SafeAreaView>
    </View>
  )
};

const SafeAreaWrapper = () => {
  return (
    <SafeAreaProvider>
      <TestApp/>
    </SafeAreaProvider>
  )
}


const Storybook = () => {
  return <StorybookUIRoot />;
};

export default Storybook;
