import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { MealNavigatorContainer, MealOrderView, MealViewProps } from './src/components/pages/order/Meal';
import { defaultTheme } from './src/defaultTheme';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';
//import StorybookUIRoot from './storybook'; This will break promises so they never resolve so only uncomment when testing
import { RestaurantNavigatorContainer, RestaurantViewProps } from './src/components/pages/order/Restaurant';
import { OrderConfirmationCartContainer, OrderConfirmationCartProps } from './src/components/pages/order/Cart';
import { ConfirmationNavigatorContainer, OrderConfirmationProps } from './src/components/pages/order/Confirmation';
import AuthStore from './src/store/authStore';
import RestaurantStore from './src/store/restaurantStore';
import { Restaurant } from './src/models/restaurant/restaurant';
import { FlexBox } from './src/components/atoms/layout/Box';
import { Spinner } from 'native-base'
import OrderStore from './src/store/orderStore';
export type RestaurantParamList = {
  RestaurantView: RestaurantViewProps
  MealView: MealViewProps
  CartView: OrderConfirmationCartProps
  ConfirmationView: OrderConfirmationProps
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

const App = () => {
  const insets = useSafeAreaInsets();
  const [isLoadingRestaurant, setLoadingRestaurant] = useState(true);
  const [restaurant, setRestaurant] = useState<Restaurant>();

  const startup = async () => {
    await AuthStore.init()
    await OrderStore.init()
    const restaurantStore = RestaurantStore.getInstance()
    await restaurantStore.getRestaurantsAsync()

    const restaurants = restaurantStore.getRestaurants().get()
    setRestaurant(restaurants[0])
    setLoadingRestaurant(false)
  }

  useEffect(() => {
    startup()
  },[])

  return (
    <View style={{paddingTop: 0, flex: 1, paddingRight: insets.right ,paddingLeft: insets.left, backgroundColor: defaultTheme.colors.black}} >
      <StatusBar barStyle={'light-content'}/>
      {
        isLoadingRestaurant &&
        <FlexBox justifyContent={'center'} alignItems={'center'} height={'100%'}>
          <Spinner color={defaultTheme.colors.greyOne}/>
        </FlexBox>
      }
      {
        !isLoadingRestaurant &&
        <NavigationContainer theme={MyTheme}>
          <RestaurantStack.Navigator initialRouteName={'RestaurantView'} screenOptions={{headerShown: false}}>
            <RestaurantStack.Screen name="RestaurantView" component={RestaurantNavigatorContainer} initialParams={{restaurant, meals: {all: restaurant?.meals!!, recommendations: restaurant?.meals!!}}}/>
            <RestaurantStack.Screen name="MealView" component={MealNavigatorContainer}/>
            <RestaurantStack.Screen name="CartView" component={OrderConfirmationCartContainer}/>
            <RestaurantStack.Screen name='ConfirmationView' component={ConfirmationNavigatorContainer}/>
          </RestaurantStack.Navigator>
        </NavigationContainer>
      }
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


// const Storybook = () => {
//   return <StorybookUIRoot />;
// };

export default SafeAreaWrapper;