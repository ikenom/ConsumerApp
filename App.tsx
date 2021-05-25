import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { RestaurantView } from './src/components/pages/order/Restaurant';
import { defaultTheme } from './src/defaultTheme';
import { MOCK_MEALS } from './src/models/meal/util';
import { MOCK_RESTAURANT } from './src/models/restaurant/util';

import StorybookUIRoot from './storybook';


const App = () => {
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: defaultTheme.colors.black}}/>
      <SafeAreaView style={{flex: 1, backgroundColor: defaultTheme.colors.black}}>
        <RestaurantView restaurant={MOCK_RESTAURANT} meals={{all: MOCK_MEALS, recommendations: MOCK_MEALS}}/>
      </SafeAreaView>
    </>
  )
};

const Storybook = () => {
  return <StorybookUIRoot />;
};

export default App;
