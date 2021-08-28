import {storiesOf} from '@storybook/react-native';
import React from "react";
import { MealOrderView } from '../../src/components/pages/order/Meal';
import { MOCK_MEALS_ALL_INFO } from '../../src/models/meal/util';
import { MOCK_RESTAURANT } from '../../src/models/restaurant/util';



export const OrderMealPageStory = () => {
  return (
    <MealOrderView meal={MOCK_MEALS_ALL_INFO[0]} restaurant={MOCK_RESTAURANT}/>
  )
}

storiesOf('Pages', module)
.add('Order - Meal', () => OrderMealPageStory());
