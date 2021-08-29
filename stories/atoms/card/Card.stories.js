import {MealCard} from '../../../src/components/atoms/card/Card';
import { CardCarousel } from '../../../src/components/atoms/card/CardCarousel';
import {storiesOf} from '@storybook/react-native';
import React from "react";
import { MOCK_MEALS, MOCK_MEALS_ENRICHED } from '../../../src/models/meal/util';
import { FlexBox } from '../../../src/components/atoms/layout/Box';
import { Icons } from '../../../src/components/atoms/card/Icons';
import { ScrollView } from 'react-native-gesture-handler';

const Horizontalmealstory = () => {
  return (
    <FlexBox flexDirection='column' >
      <MealCard meal={MOCK_MEALS_ENRICHED[0]} layoutType='horizontal' onPress={() => { }} />
      <MealCard meal={MOCK_MEALS_ENRICHED[1]} layoutType='horizontal' onPress={() => { }} />
      <MealCard meal={MOCK_MEALS_ENRICHED[2]} layoutType='horizontal' onPress={() => { }} />
    </FlexBox>
  )
}

const Verticalmealstory = () => {
  return (
    <ScrollView>
      <FlexBox flexDirection='column' >
        <MealCard meal={MOCK_MEALS_ENRICHED[0]} layoutType='vertical' onPress={() => { }} />
        <MealCard meal={MOCK_MEALS_ENRICHED[1]} layoutType='vertical' onPress={() => { }} />
        <MealCard meal={MOCK_MEALS_ENRICHED[2]} layoutType='vertical' onPress={() => { }} />
      </FlexBox>
    </ScrollView>
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
  .add('VerticalMealCard', () => Verticalmealstory());

storiesOf('Carousel', module)
  .add('Short Carousel', () => ShortCarousel())
  .add('Tall Carousel Less Info', () => TallCarouselLessInfo())
  .add('Tall Carousel More Info', () => TallCarouselMoreInfo());
