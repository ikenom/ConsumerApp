import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
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
import AuthStore from './src/store/authStore';
import RestaurantStore from './src/store/restaurantStore';
import OrderStore from './src/store/orderStore';
import { HomeNavContainer, HomeViewProps } from './src/components/pages/navigation/Home';
import { LoadingView } from './src/components/pages/Loading';
import { SeeAsTilesNavContainer, SeeAsTilesProps } from './src/components/pages/navigation/SeeAsTiles';
import { Meal, EnrichedMeal } from './src/models/meal/meal';
import { MOCK_MEALS } from './src/models/meal/util';
import UserStore from './src/store/userStore';
import { RestaurantParamList, RestaurantStackScreens } from './src/navigator/RestaurantStack';

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
  const [newMeals, setNewMeals] = useState<EnrichedMeal[]>();
  const [popularMeals, setPopularMeals] = useState<EnrichedMeal[]>();
  const [orderAgainMeals, setOrderAgainMeals] = useState<EnrichedMeal[]>();

  const RootStack = createStackNavigator<RootStackParamList>();
  const HomeStack = createStackNavigator<HomeStackParamList>();

  const startup = async () => {
    await AuthStore.init()
    const orderStore = OrderStore.getInstance()
    const userStore = UserStore.getInstance()
    const restaurantStore = RestaurantStore.getInstance()
    await restaurantStore.getRestaurantsAsync()

    // PLACEHOLDER Fake fns to be replaced with getting real data
    const getDummySlideshowImages = () => MOCK_MEALS.map((meal) => meal.image);

    const enrichMeals = (meals: Meal[]): EnrichedMeal[] => {
      let mealCardData = [];
      for (let i = 0; i < meals.length; i++) {
        const restaurant = restaurantStore.getRestaurantById(meals[i].restaurantId)
        const isFlagged = userStore.isMealFlagged(meals[i])
        mealCardData.push({
          ...meals[i],
          restaurantName: restaurant?.name,
          flagged: isFlagged
        })
      }
      return mealCardData
    }
    
    // Load Location
    setLocation("Harlem");
    
    // TODO Load Profile Picture
    
    // TODO Load Notifications Present
    setHasNotifications(false);
    
    // Load Slideshow Images
    setHomeSlideshowImages(getDummySlideshowImages); // PLACEHOLDER
    
    console.log(restaurantStore)
    // Load New on FYTR
    setNewMeals(enrichMeals(restaurantStore.getNewMeals()));
    
    // Load Popular
    setPopularMeals(enrichMeals(restaurantStore.getPopularMeals()));
    
    // Load Order Again
    setOrderAgainMeals(enrichMeals(orderStore.getOrderAgainMeals()));
    
    setLoadingRestaurant(false)
  }

  useEffect(() => {
    startup()
  },[])

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