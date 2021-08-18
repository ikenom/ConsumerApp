import {MealCard} from '../../../src/components/atoms/card/Card';
import { CardCarousel } from '../../../src/components/atoms/card/CardCarousel';
import {storiesOf} from '@storybook/react-native';
import React from "react";
import { MOCK_MEALS_ALL_INFO } from '../../../src/models/meal/util';
import { FlexBox } from '../../../src/components/atoms/layout/Box';

const HorizontalMealCardStory = () => {
  const mealCardData = { meal: MOCK_MEALS_ALL_INFO[0] }
  return(
      <MealCard mealCardData={mealCardData} type='horizontal' onPress={() => {}} />
  )
}

const VerticalMealCardStory = () => {
  const mealCardData = {
    meal: MOCK_MEALS_ALL_INFO[1], 
    restaurantName: "Oo Kwispy", 
    flagged: true, 
    distance: "4.2"
  }
  return(
      <MealCard mealCardData={mealCardData} type='vertical' onPress={() => {}} />
  )
}

const RandomHeightCardStory = () => {
  return (
    <FlexBox flexDimension='row'>
      <MealCard mealCardData={{ meal: MOCK_MEALS_ALL_INFO[2] }} type='random-height' onPress={() => {}} />
      <MealCard mealCardData={{ meal: MOCK_MEALS_ALL_INFO[3]} } type='random-height' onPress={() => {}} />
    </FlexBox>
  )
}

const ShortCardCarousel = () => {
  const mealCards = MOCK_MEALS_ALL_INFO.map(
    (meal) => {
      return { meal: meal }
    }
  )
  return (
    <CardCarousel layoutType='short' mealCards={mealCards} />
  )
}

const TallCardCarouselPriceOnly = () => {
  const mealCards = MOCK_MEALS_ALL_INFO.map(
    (meal) => {
      return { meal: meal }
    }
  )
  return (
    <CardCarousel layoutType='tall' mealCards={mealCards} />
  )
}

const TallCardCarouselAllData = () => {
  const mealCards = MOCK_MEALS_ALL_INFO.map(
    (meal) => {
      return { meal: meal, distance: "4.2", flagged: true, restaurantName: "Restaurant Name Here" }
    }
  )
  return (
    <CardCarousel layoutType='tall' mealCards={mealCards} />
  )
}

storiesOf('Card', module)
  .add('HorizontalMealCard', () => HorizontalMealCardStory())
  .add('VerticalMealCard', () => VerticalMealCardStory())
  .add('RandomHeightCard', () => RandomHeightCardStory());

storiesOf('Carousel', module)
  .add('ShortCardCarousel', () => ShortCardCarousel())
  .add('TallCardCarouselPriceOnly', () => TallCardCarouselPriceOnly())
  .add('TallCardCarouselAllData', () => TallCardCarouselAllData());
