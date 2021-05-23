import React from 'react';
import { SafeAreaView } from 'react-native';
import { RestaurantView } from './src/components/pages/order/Restaurant';
import { MOCK_MEALS } from './src/models/meal/util';
import { MOCK_RESTAURANT } from './src/models/restaurant/util';

import StorybookUIRoot from './storybook';


const App = () => {
  return (
    <SafeAreaView>
      <RestaurantView restaurant={MOCK_RESTAURANT} meals={{all: MOCK_MEALS, recommendations: MOCK_MEALS}}/>
    </SafeAreaView>
  )
};

const Storybook = () => {
  return <StorybookUIRoot />;
};

export default App;
