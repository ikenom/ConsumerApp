import {MealCard} from '../../../src/components/atoms/card/Card';
import { CardCarousel } from '../../../src/components/atoms/card/CardCarousel';
import {storiesOf} from '@storybook/react-native';
import React from "react";
import { MOCK_MEALS_ALL_INFO } from '../../../src/models/meal/util';
import { FlexBox } from '../../../src/components/atoms/layout/Box';

const HorizontalMealCardStory = () => {

  return(
      <MealCard meal={MOCK_MEALS_ALL_INFO[0]} type='horizontal' onPress={() => {}}/>
  )
}

const VerticalMealCardStory = () => {

  return(
      <MealCard meal={MOCK_MEALS_ALL_INFO[1]} type='vertical' onPress={() => {}}/>
  )
}

const RandomHeightCardStory = () => {
  return (
    <FlexBox flexDimension='row'>
      <MealCard meal={MOCK_MEALS_ALL_INFO[2]} type='random-height' onPress={() => {}} />
      <MealCard meal={MOCK_MEALS_ALL_INFO[3]} type='random-height' onPress={() => {}} />
    </FlexBox>
  )
}

const ShortCardCarousel = () => {
  const mealCardProps = MOCK_MEALS_ALL_INFO.map(
    (meal) => {
      return { meal: meal }
    }
  )
  return (
    <CardCarousel layoutType='short' mealCardData={mealCardProps} />
  )
}

const TallCardCarouselPriceOnly = () => {
  const mealCardProps = MOCK_MEALS_ALL_INFO.map(
    (meal) => {
      return { meal: meal }
    }
  )
  return (
    <CardCarousel layoutType='tall' mealCardData={mealCardProps} />
  )
}

const TallCardCarouselAllData = () => {
  const mealCardProps = MOCK_MEALS_ALL_INFO.map(
    (meal) => {
      return { meal: meal, displayDistance: true, flagged: true, restaurantName: "Name Here" }
    }
  )
  return (
    <CardCarousel layoutType='tall' mealCardData={mealCardProps} />
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
