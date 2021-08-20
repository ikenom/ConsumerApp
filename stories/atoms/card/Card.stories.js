import {MealCard} from '../../../src/components/atoms/card/Card';
import { CardCarousel } from '../../../src/components/atoms/card/CardCarousel';
import {storiesOf} from '@storybook/react-native';
import React from "react";
import { MOCK_MEALS, MOCK_MEALS_ENRICHED } from '../../../src/models/meal/util';
import { FlexBox } from '../../../src/components/atoms/layout/Box';

const Horizontalmealstory = () => {
  return(
      <MealCard meal={MOCK_MEALS[0]} type='horizontal' onPress={() => {}} />
  )
}

const Verticalmealstory = () => {
  return(
      <MealCard meal={MOCK_MEALS_ENRICHED[1]} type='vertical' onPress={() => {}} />
  )
}

const RandomHeightCardStory = () => {
  return (
    <FlexBox flexDimension='row'>
      <MealCard meal={MOCK_MEALS_ENRICHED[1]} type='random-height' onPress={() => { }} />
      <MealCard meal={MOCK_MEALS_ENRICHED[2]} type='random-height' onPress={() => { }} />
    </FlexBox>
  )
}

const ShortCarousel = () => {
  return (
    <CardCarousel layoutType='short' meals={MOCK_MEALS} />
  )
}

const TallCarouselLessInfo = () => {
  return (
    <CardCarousel layoutType='tall' meals={MOCK_MEALS} />
  )
}

const TallCarouselMoreInfo = () => {
  return (
    <CardCarousel layoutType='tall' meals={MOCK_MEALS_ENRICHED} />
  )
}

storiesOf('Card', module)
  .add('HorizontalMealCard', () => Horizontalmealstory())
  .add('VerticalMealCard', () => Verticalmealstory())
  .add('RandomHeightCard', () => RandomHeightCardStory());

storiesOf('Carousel', module)
  .add('Short Carousel', () => ShortCarousel())
  .add('Tall Carousel Less Info', () => TallCarouselLessInfo())
  .add('Tall Carousel More Info', () => TallCarouselMoreInfo());
