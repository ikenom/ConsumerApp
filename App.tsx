import React from 'react';
import { SafeAreaView } from 'react-native';
import { MealOrderView } from './src/components/pages/order/Meal';
import { defaultTheme } from './src/defaultTheme';
import { MOCK_MEALS } from './src/models/meal/util';
import { MOCK_RESTAURANT } from './src/models/restaurant/util';

import StorybookUIRoot from './storybook';


const App = () => {
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: defaultTheme.colors.black}}/>
      <SafeAreaView style={{flex: 1, backgroundColor: defaultTheme.colors.black}}>
        {/* <RestaurantView restaurant={MOCK_RESTAURANT} meals={{all: MOCK_MEALS, recommendations: MOCK_MEALS}}/> */}
        <MealOrderView meal={MOCK_MEALS[0]} restaurant={MOCK_RESTAURANT}/>
      </SafeAreaView>
    </>
  )
};

const Storybook = () => {
  return <StorybookUIRoot />;
};

export default App;
