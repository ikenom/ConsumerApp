import {MealCard} from '../../../src/components/atoms/card/Card';
import {storiesOf} from '@storybook/react-native';
import React from "react";

const image = require('../../../assets/testImages/waffles.jpeg');
// Todo: Import images like here https://www.codegrepper.com/code-examples/javascript/react+native+image+file+path+variable
const HorizontalMealCardStory = () => {
  const mealName = "Hazelnut Belgian Waffles";
  const price = "12.99";

  return(
    <MealCard mealName={mealName} price={price} type='horizontal' image={image}/>
  )
}

const VerticalMealCardStory = () => {
  const mealName = "Hazelnut Belgian Waffles with Fruit";
  const price = "12.99";

  return(
    <MealCard mealName={mealName} price={price} type='vertical' image={image}/>
  )
}


storiesOf('Card', module)
  .add('HorizontalMealCard', () => HorizontalMealCardStory())
  .add('VerticalMealCard', () => VerticalMealCardStory());
