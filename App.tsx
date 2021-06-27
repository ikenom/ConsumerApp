import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { MealNavigatorContainer, MealOrderView, MealViewProps } from './src/components/pages/order/Meal';
import { defaultTheme } from './src/defaultTheme';
import { MOCK_MEALS } from './src/models/meal/util';
import { MOCK_RESTAURANT } from './src/models/restaurant/util';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';
import StorybookUIRoot from './storybook';
import { ConfirmationNavigatorContainer } from './src/components/pages/order/Confirmation';
import { RestaurantNavigatorContainer, RestaurantViewProps } from './src/components/pages/order/Restaurant';
import { OrderConfirmationCartContainer, OrderConfirmationCartProps } from './src/components/pages/order/Cart';
import { OrderConfirmationProps } from './src/components/pages/order/Confirmation';
import { HomeViewProps, HomeNavigatorContainer } from './src/components/pages/navigation/Home';
import { Confirmation } from './src/components/pages/order/Confirmation';
import { MOCK_ORDER } from './src/models/order/util';
export type RestaurantParamList = {
  RestaurantView: RestaurantViewProps
  MealView: MealViewProps
  CartView: OrderConfirmationCartProps
  ConfirmationView: OrderConfirmationProps
  HomeView: HomeViewProps
}

const RestaurantStack = createStackNavigator<RestaurantParamList>();

const platformVersion = Platform.Version;

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: defaultTheme.colors.black,
  },
};

// TEMP Using RestaurantStack to get to Home, should be separate
const App = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: 0, flex: 1, paddingRight: insets.right ,paddingLeft: insets.left, backgroundColor: defaultTheme.colors.black}} >
      <StatusBar barStyle={'light-content'}/>
      <NavigationContainer theme={MyTheme}>
        <RestaurantStack.Navigator initialRouteName={'RestaurantView'} screenOptions={{headerShown: false}}>
          <RestaurantStack.Screen name="RestaurantView" component={RestaurantNavigatorContainer} initialParams={{restaurant: MOCK_RESTAURANT, meals: {all: MOCK_MEALS, recommendations: MOCK_MEALS}}}/>
          <RestaurantStack.Screen name="MealView" component={MealNavigatorContainer}/>
          <RestaurantStack.Screen name="CartView" component={OrderConfirmationCartContainer}/>
          <RestaurantStack.Screen name='ConfirmationView' component={ConfirmationNavigatorContainer}/>
          <RestaurantStack.Screen name='HomeView' component={HomeNavigatorContainer} />
        </RestaurantStack.Navigator>
      </NavigationContainer>
    </View>
  )
};

const TestApp = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: 0, flex: 1, paddingRight: insets.right ,paddingLeft: insets.left,paddingBottom: insets.bottom ,backgroundColor: defaultTheme.colors.black}} >
      <StatusBar barStyle={'light-content'}/>
      <SafeAreaView style={{flex: 0, backgroundColor: defaultTheme.colors.black}}/>
      <SafeAreaView style={{flex: 1, backgroundColor: defaultTheme.colors.black}}>
        {/* <OrderConfirmationCart restaurant={MOCK_RESTAURANT} meal={MOCK_MEALS[0]}/> */}
        <Confirmation order={MOCK_ORDER} restaurant={MOCK_RESTAURANT}/>
      </SafeAreaView>
    </View>
  )
};

const SafeAreaWrapper = () => {
  return (
    <SafeAreaProvider>
      <App/>
    </SafeAreaProvider>
  )
}


const Storybook = () => {
  return <StorybookUIRoot />;
};

export default SafeAreaWrapper;


/**
 * 1) Finish Order confirmation page
 * 2) Build routes to cart can confirmation
 * 3) Define meal and order store
 * 4) Setup apollo client and connect to backend
 * 5) Write a few test
 * 6) Setup CI/CD pipeline
 */