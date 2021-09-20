import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { defaultTheme } from './src/defaultTheme';
import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import AuthStore from './src/store/authStore';
import RestaurantStore from './src/store/restaurantStore';
import OrderStore from './src/store/orderStore';
import { LoadingView } from './src/components/pages/Loading';
import UserStore from './src/store/userStore';
import { RootStackScreens } from './src/navigator/RootStack';

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
      <NavigationContainer theme={MyTheme}>
        {
          isLoadingRestaurant ? (
            <LoadingView />
          ) : (
            RootStackScreens()
          )
        }
      </NavigationContainer>
    </View>
  )
  
};

let SafeAreaWrapper = () => {

  return (
    <SafeAreaProvider>
      <App/>
    </SafeAreaProvider>
  )
}

 
// Uncomment this code block to run the storybook
// Comment out this block to run the app

// import StorybookUIRoot from './storybook';

// SafeAreaWrapper = () => {
//   return <StorybookUIRoot />;
// }; 



export default SafeAreaWrapper;