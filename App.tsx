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
import { LoadingView } from './src/components/pages/Loading';
import UserStore from './src/store/userStore';
import { HomeStackParamList, HomeStackScreens } from './src/navigator/HomeStack';

type RootStackParamList = {
  Loading: undefined;
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
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

  const RootStack = createStackNavigator<RootStackParamList>();

  const startup = async () => {
    await AuthStore.init()
    await OrderStore.init()
    await UserStore.init()
    const restaurantStore = RestaurantStore.getInstance()
    await restaurantStore.getRestaurantsAsync()
    
    setLoadingRestaurant(false)
  }

  useEffect(() => {
    startup()
  },[])

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