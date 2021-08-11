import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { MealNavigatorContainer, MealViewProps } from './src/components/pages/order/Meal';
import { defaultTheme } from './src/defaultTheme';
import {
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
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
import { HomeNavContainer, HomeViewProps } from './src/components/pages/navigation/Home';
import { LoadingView } from './src/components/pages/Loading';
import { MOCK_MEALS_ALL_INFO } from './src/models/meal/util';
import { SeeAsTilesNavContainer, SeeAsTilesProps, SeeAsTilesView } from './src/components/pages/navigation/SeeAsTiles';

type RootStackParamList = {
  Loading: undefined;
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  //RootTab: NavigatorScreenParams<RootTabParamList>;
}

type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Discover: undefined;
  Profile: undefined;
}

export type HomeStackParamList = {
  Home: HomeViewProps;
  SeeAsTiles: SeeAsTilesProps;
  Notifications: undefined;
  RestaurantStack: NavigatorScreenParams<RestaurantParamList>;
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
  const [location, setLocation] = useState("Harlem Prime");
  const [hasNotifications, setHasNotifications]  = useState(true);
  const [homeSlideshowImages, setHomeSlideshowImages] = useState(undefined);
  const [newMeals, setNewMeals] = useState([]);
  const [popularMeals, setPopularMeals] = useState([]);
  const [orderAgainMeals, setOrderAgainMeals] = useState([]);
  const [restaurant, setRestaurant] = useState<Restaurant>(); // DELETE

  const RootStack = createStackNavigator<RootStackParamList>();
  const RootTab = createBottomTabNavigator<RootTabParamList>();
  const HomeStack = createStackNavigator<HomeStackParamList>();
  const RestaurantStack = createStackNavigator<RestaurantParamList>();

  const startup = async () => {
    await AuthStore.init()
    await OrderStore.init()
    const restaurantStore = RestaurantStore.getInstance()
    await restaurantStore.getRestaurantsAsync()

    const restaurants = restaurantStore.getRestaurants().get() // This should be .value if want to handle null or undefined

    // TEMP Fake fns to be replaced with getting real data
    const getDummySlideshowImages = () => MOCK_MEALS_ALL_INFO.map((meal) => meal.image);
    const getDummyCarouselMeals = () => restaurants[0].meals.concat(MOCK_MEALS_ALL_INFO); // Combo of backend and mock data
    
    // Load Location
    setLocation("Harlem");
    
    // TODO Load Profile Picture
    
    // TODO Load Notifications Present
    setHasNotifications(false);
    
    // Load Slideshow Images
    setHomeSlideshowImages(getDummySlideshowImages);
    
    // Load New on FYTR
    setNewMeals(getDummyCarouselMeals);
    
    // TODO Load Popular
    setPopularMeals(getDummyCarouselMeals);
    
    // TODO Load Order Again
    setOrderAgainMeals(getDummyCarouselMeals);
    
    setRestaurant(restaurants[0])
    setLoadingRestaurant(false)
  }

  useEffect(() => {
    startup()
  },[])

  const RootTabScreens = () => (
    <RootTab.Navigator>
      <RootTab.Screen name="Home" component={HomeStackScreens} options={{title: 'Home'}} />
      <RootTab.Screen name="Discover" component={SeeAsTilesView} options={{title: 'Discover'}} />
      <RootTab.Screen name="Profile" component={SeeAsTilesView} options={{title: 'Profile'}} />
    </RootTab.Navigator>
  )

  // TEMP Initial params for HomeNavigatorContainer are temp
  const HomeStackScreens = () => (
    <HomeStack.Navigator screenOptions= {{ headerShown: false }}>
      <HomeStack.Screen
        name="Home"
        component={HomeNavContainer}
        initialParams={{
          locationName: location,
          slideshowImages: homeSlideshowImages,
          meals: {
            new: newMeals,
            popular: popularMeals,
            orderAgain: orderAgainMeals
          }
        }} />
      <HomeStack.Screen name="SeeAsTiles" component={SeeAsTilesNavContainer} />
      <HomeStack.Screen name="RestaurantStack" component={RestaurantStackScreens} />
    </HomeStack.Navigator>
  )

  // TODO May make more sense to call this MealStack
  const RestaurantStackScreens = () => (
    <RestaurantStack.Navigator initialRouteName={'RestaurantView'} screenOptions={{ headerShown: false }}>
      <RestaurantStack.Screen name="RestaurantView"
        component={RestaurantNavigatorContainer}
        initialParams={{
          restaurant,
          meals: {
            all: restaurant?.meals!!,
            recommendations: restaurant?.meals!!
          }
        }} />
      <RestaurantStack.Screen name="MealView" component={MealNavigatorContainer} />
      <RestaurantStack.Screen name="CartView" component={OrderConfirmationCartContainer} />
      <RestaurantStack.Screen name='ConfirmationView' component={ConfirmationNavigatorContainer} />
    </RestaurantStack.Navigator>
  );

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
                name="HomeStack" 
                component={HomeStackScreens}
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