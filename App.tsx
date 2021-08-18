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
import { SeeAsTilesNavContainer, SeeAsTilesProps } from './src/components/pages/navigation/SeeAsTiles';
import { Meal } from './src/models/meal/meal';
import { MealCardData } from './src/components/atoms/card/Card';

type RootStackParamList = {
  Loading: undefined;
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
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
  const [homeSlideshowImages, setHomeSlideshowImages] = useState<string[]>();
  const [newMeals, setNewMeals] = useState<MealCardData[]>();
  const [popularMeals, setPopularMeals] = useState<MealCardData[]>();
  const [orderAgainMeals, setOrderAgainMeals] = useState<MealCardData[]>();
  const [restaurant, setRestaurant] = useState<Restaurant>(); // DELETE

  const RootStack = createStackNavigator<RootStackParamList>();
  const HomeStack = createStackNavigator<HomeStackParamList>();
  const RestaurantStack = createStackNavigator<RestaurantParamList>();

  const startup = async () => {
    await AuthStore.init()
    const orderStore = OrderStore.getInstance()
    const restaurantStore = RestaurantStore.getInstance()
    await restaurantStore.getRestaurantsAsync()

    const restaurants = restaurantStore.getRestaurants().get() // This should be .value if want to handle null or undefined

    // PLACEHOLDER Fake fns to be replaced with getting real data
    const getDummySlideshowImages = () => MOCK_MEALS_ALL_INFO.map((meal) => meal.image);
    
    // Load Location
    setLocation("Harlem");
    
    // TODO Load Profile Picture
    
    // TODO Load Notifications Present
    setHasNotifications(false);
    
    // Load Slideshow Images
    setHomeSlideshowImages(getDummySlideshowImages); // PLACEHOLDER
    
    console.log(restaurantStore)
    // Load New on FYTR
    setNewMeals(buildMealCardData(restaurantStore.getNewMeals()));
    
    // TODO Load Popular
    setPopularMeals(buildMealCardData(restaurantStore.getPopularMeals()));
    
    // TODO Load Order Again
    setOrderAgainMeals(buildMealCardData(orderStore.getOrderAgainMeals()));
    
    setRestaurant(restaurants[0])
    setLoadingRestaurant(false)
  }

  useEffect(() => {
    startup()
  },[])

  const buildMealCardData = (meals: Meal[]): MealCardData[] => {
    // TODO Pull restaurant name by ID, figure out where flagged comes from
    let mealCardData = [];
    for (let i = 0; i < meals.length; i++) {
      mealCardData.push({
        meal: meals[i],
        restaurantName: "Name from buildMealCardData",
        flagged: true
      })
    }
    console.log(mealCardData)
    return mealCardData
  }

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