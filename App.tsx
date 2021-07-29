import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { MealNavigatorContainer, MealOrderView, MealViewProps } from './src/components/pages/order/Meal';
import { defaultTheme } from './src/defaultTheme';
import {
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
  Route,
  RouteProp
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
//import StorybookUIRoot from './storybook'; // This will break promises so they never resolve so only uncomment when testing
import { RestaurantNavigatorContainer, RestaurantViewProps } from './src/components/pages/order/Restaurant';
import { OrderConfirmationCartContainer, OrderConfirmationCartProps } from './src/components/pages/order/Cart';
import { ConfirmationNavigatorContainer, OrderConfirmationProps } from './src/components/pages/order/Confirmation';
import AuthStore from './src/store/authStore';
import RestaurantStore from './src/store/restaurantStore';
import { Restaurant } from './src/models/restaurant/restaurant';
import OrderStore from './src/store/orderStore';
import { HomeNavigatorContainer, HomeViewProps } from './src/components/pages/navigation/Home';
import { LoadingView } from './src/components/pages/Loading';
import { MOCK_MEALS_ALL_INFO } from './src/models/meal/util';
import { SeeAsTilesProps, SeeAsTilesView } from './src/components/pages/navigation/SeeAsTiles';

type RootStackParamList = {
  Loading: undefined;
  RootTab: NavigatorScreenParams<RootTabParamList>;
}

type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Discover: undefined;
  Profile: undefined;
}

// TODO Change back to NavigatorScreenParams
export type HomeStackParamList = {
  Home: HomeViewProps;
  SeeAsTiles: SeeAsTilesProps;
  Notifications: undefined;
}

export type RestaurantParamList = {
  RestaurantView: RestaurantViewProps
  MealView: MealViewProps
  CartView: OrderConfirmationCartProps
  ConfirmationView: OrderConfirmationProps
}

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

  const RootStack = createStackNavigator<RootStackParamList>();
  const RootTab = createBottomTabNavigator<RootTabParamList>();
  const HomeStack = createStackNavigator<HomeStackParamList>();
  const RestaurantStack = createStackNavigator<RestaurantParamList>();

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

  // TODO Replace HomeView with HomeStack, fill in Discover and Profile
  const RootTabScreens = () => (
    <RootTab.Navigator>
      <RootTab.Screen name="Home" component={HomeStackScreens} options={{title: 'Home'}} />
      <RootTab.Screen name="Discover" component={SeeAsTilesView} options={{title: 'Discover'}} />
      <RootTab.Screen name="Profile" component={SeeAsTilesView} options={{title: 'Profile'}} />
    </RootTab.Navigator>
  )

  // TEMP Create test images for slideshow carousel on Home
  const homeSlideshowImages = MOCK_MEALS_ALL_INFO.map(
    (meal) => meal.image
  );

  const HomeStackScreens = () => (
    <HomeStack.Navigator screenOptions= {{ headerShown: false }}>
      <HomeStack.Screen
        name="Home"
        component={HomeNavigatorContainer}
        initialParams={{
          locationName: "Harlem",
          newsTiles: homeSlideshowImages,
          meals: {
            new: MOCK_MEALS_ALL_INFO,
            popular: MOCK_MEALS_ALL_INFO,
            orderAgain: MOCK_MEALS_ALL_INFO
          }
        }} />
      <HomeStack.Screen name="SeeAsTiles" component={SeeAsTilesView} />
    </HomeStack.Navigator>
  )

  return (
    <View style={{
      paddingTop: 0,
      flex: 1,
      paddingRight:
        insets.right,
      paddingLeft:
        insets.left,
      backgroundColor: defaultTheme.colors.black
    }} >
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer>

        {
          isLoadingRestaurant ? (
            <LoadingView />
          ) : (
            <RootStack.Navigator>
              <RootStack.Screen
                name="RootTab"
                component={RootTabScreens}
                options={{ headerShown: false }} />
            </RootStack.Navigator>
          )
        }

      </NavigationContainer>
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


/* const Storybook = () => {
  return <StorybookUIRoot />;
}; */

export default SafeAreaWrapper;