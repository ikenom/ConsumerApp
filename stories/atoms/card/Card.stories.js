import {MealCard} from '../../../src/components/atoms/card/Card';
import { CardCarousel } from '../../../src/components/atoms/card/CardCarousel';
import {storiesOf} from '@storybook/react-native';
import React from "react";

const image = require('../../../assets/testImages/waffles.jpeg');
// Todo: Import images like here https://www.codegrepper.com/code-examples/javascript/react+native+image+file+path+variable

const BASIC_MEALS = [ 
  {
    name: "Hazelnut Belgian Waffles",
    price: "12.99",
    image: require('../../../assets/testImages/waffles.jpeg')
  },
  {
    name: "Lemon Grilled Chicken",
    price: "17.02",
    image: require('../../../assets/testImages/chickenMeal.jpeg')
  },
  {
    name: "Spicy Pulled Pork",
    price: "8.53",
    image: require('../../../assets/testImages/pulledPork.jpeg')
  },
  {
    name: "Hazelnut Belgian Waffles",
    price: "12.99",
    image: require('../../../assets/testImages/waffles.jpeg')
  },
  {
    name: "Lemon Grilled Chicken",
    price: "17.02",
    image: require('../../../assets/testImages/chickenMeal.jpeg')
  },
  {
    name: "Spicy Pulled Pork",
    price: "8.53",
    image: require('../../../assets/testImages/pulledPork.jpeg')
  }
]


const HorizontalMealCardStory = () => {

  return(
      <MealCard meal={BASIC_MEALS[0]} type='horizontal' image={image}/>
  )
}

const VerticalMealCardStory = () => {

  return(
      <MealCard meal={BASIC_MEALS[1]} type='vertical' image={image}/>
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
