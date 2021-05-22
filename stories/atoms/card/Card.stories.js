import {MealCard} from '../../../src/components/atoms/card/Card';
import {Box} from '../../..//src/components/atoms/layout/Box';
import { CardCarousel } from '../../../src/components/atoms/card/CardCarousel';
import {storiesOf} from '@storybook/react-native';
import React from "react";

const image = require('../../../assets/testImages/waffles.jpeg');
// Todo: Import images like here https://www.codegrepper.com/code-examples/javascript/react+native+image+file+path+variable

const BASIC_MEALS = [ 
  {
    mealName: "Hazelnut Belgian Waffles",
    price: "12.99",
    image: require('../../../assets/testImages/waffles.jpeg')
  },
  {
    mealName: "Lemon Grilled Chicken",
    price: "17.02",
    image: require('../../../assets/testImages/chickenMeal.jpeg')
  },
  {
    mealName: "Spicy Pulled Pork",
    price: "8.53",
    image: require('../../../assets/testImages/pulledPork.jpeg')
  },
  {
    mealName: "Hazelnut Belgian Waffles",
    price: "12.99",
    image: require('../../../assets/testImages/waffles.jpeg')
  },
  {
    mealName: "Lemon Grilled Chicken",
    price: "17.02",
    image: require('../../../assets/testImages/chickenMeal.jpeg')
  },
  {
    mealName: "Spicy Pulled Pork",
    price: "8.53",
    image: require('../../../assets/testImages/pulledPork.jpeg')
  }
]


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

const BasicCardCarousel = () => {
  return(
    <CardCarousel layoutType='horizontal' meals={BASIC_MEALS} />
  )
}


storiesOf('Card', module)
  .add('HorizontalMealCard', () => HorizontalMealCardStory())
  .add('VerticalMealCard', () => VerticalMealCardStory())
  .add('BasicCardCarousel', () => BasicCardCarousel());
