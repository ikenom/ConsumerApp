import { MealCard, BannerCard } from '../../../src/components/atoms/card/Card';
import { CardCarousel } from '../../../src/components/atoms/card/CardCarousel';
import { storiesOf } from '@storybook/react-native';
import React from "react";
import { MOCK_MEALS, MOCK_MEALS_ENRICHED } from '../../../src/models/meal/util';
import { FlexBox } from '../../../src/components/atoms/layout/Box';
import { ScrollView } from 'react-native-gesture-handler';

const MealCardStory = () => {
  return (
    <FlexBox flexDirection='column' >
      <MealCard meal={MOCK_MEALS_ENRICHED[0]} onPress={() => { }} />
      <MealCard meal={MOCK_MEALS_ENRICHED[1]} onPress={() => { }} />
      <MealCard meal={MOCK_MEALS_ENRICHED[2]} onPress={() => { }} />
    </FlexBox>
  )
}

const BannerCardStory = () => {
  return (
    <ScrollView>
      <FlexBox flexDirection='column' >
        <BannerCard meal={MOCK_MEALS_ENRICHED[0]} onPress={() => { }} />
        <BannerCard meal={MOCK_MEALS_ENRICHED[1]} onPress={() => { }} />
        <BannerCard meal={MOCK_MEALS_ENRICHED[2]} onPress={() => { }} />
      </FlexBox>
    </ScrollView>
  )
}

const CarouselLessInfoStory = () => {
  return (
    <CardCarousel meals={MOCK_MEALS} />
  )
}

const CarouselMoreInfoStory = () => {
  return (
    <CardCarousel meals={MOCK_MEALS_ENRICHED} />
  )
}

storiesOf('Card', module)
  .add('Meal Card', () => MealCardStory())
  .add('Banner Card', () => BannerCardStory());

storiesOf('Carousel', module)
  .add('Carousel Less Info', () => CarouselLessInfoStory())
  .add('Carousel More Info', () => CarouselMoreInfoStory());
