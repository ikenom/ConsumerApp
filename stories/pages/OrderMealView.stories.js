import {storiesOf} from '@storybook/react-native';
import React from "react";
import { MealOrderView } from '../../src/components/pages/order/Meal';
import { MOCK_MEALS } from '../../src/models/meal/util';
import { MOCK_RESTAURANT } from '../../src/models/restaurant/util';



export const OrderMealPageStory = () => {
  return (
    <MealOrderView meal={MOCK_MEALS[0]} restaurant={MOCK_RESTAURANT}/>
  )
}

storiesOf('Card', module)
.add('Order - Meal Page', () => OrderMealPageStory());
