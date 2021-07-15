import {MealCard} from '../../../src/components/atoms/card/Card';
import { CardCarousel } from '../../../src/components/atoms/card/CardCarousel';
import {storiesOf} from '@storybook/react-native';
import React from "react";
import { MOCK_MEALS_ALL_INFO } from '../../../src/models/meal/util';
import { FlexBox } from '../../../src/components/atoms/layout/Box';

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

export const MORE_DATA_MEALS = [
  {
    name: "Hazelnut Belgian Waffles",
    restaurant: "Awful Waffle",
    price: "12.99",
    distance: "0.8",
    flagged: false,
    image: require('../../../assets/testImages/waffles.jpeg'),
  },
  {
    name: "Lemon Grilled Chicken",
    restaurant: "Wild Chix",
    price: "17.02",
    distance: "2.4",
    flagged: false,
    image: require('../../../assets/testImages/chickenMeal.jpeg'),
  },
  {
    name: "Spicy Pulled Pork",
    restaurant: "Curly Tail",
    price: "8.53",
    distance:  "3.1",
    flagged: true,
    image: require('../../../assets/testImages/pulledPork.jpeg'),
  },
  {
    name: "Hazelnut Belgian Waffles But With Many More Characters So We Can See Truncate",
    restaurant: "Very Super Long Restaurant Name",
    price: "420.00",
    distance: "70.65",
    flagged: true,
    image: require('../../../assets/testImages/waffles.jpeg'),
  },
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

const RandomHeightCardStory = () => {
  return (
    <FlexBox flexDimension='row'>
      <MealCard meal={BASIC_MEALS[2]} type='random-height' image={image} />
      <MealCard meal={BASIC_MEALS[3]} type='random-height' image={image} />
    </FlexBox>
  )
}

const ShortCardCarousel = () => {
  return(
    <CardCarousel layoutType='short' meals={BASIC_MEALS} />
  )
}

const TallCardCarouselPriceOnly = () => {
  return(
    <CardCarousel layoutType='tall' meals={BASIC_MEALS} />
  )
}

const TallCardCarouselAllData = () => {
  return(
    <CardCarousel layoutType='tall' meals={MORE_DATA_MEALS} />
  )
}

storiesOf('Card', module)
  .add('HorizontalMealCard', () => HorizontalMealCardStory())
  .add('VerticalMealCard', () => VerticalMealCardStory())
  .add('RandomHeightCard', () => RandomHeightCardStory());

storiesOf('Carousel', module)
  .add('BasicShortCardCarousel', () => ShortCardCarousel())
  .add('BasicTallCardCarouselPriceOnly', () => TallCardCarouselPriceOnly())
  .add('BasicTallCardCarouselAllData', () => TallCardCarouselAllData());
