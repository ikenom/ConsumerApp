import { MealCard, BannerCard, BigCard } from '../../../src/components/atoms/card/Card';
import { CardCarousel } from '../../../src/components/atoms/card/CardCarousel';
import { storiesOf } from '@storybook/react-native';
import React from "react";
import { MOCK_MEALS, MOCK_MEALS_ENRICHED } from '../../../src/models/meal/util';
import { FlexBox } from '../../../src/components/atoms/layout/Box';
import { ScrollView } from 'react-native-gesture-handler';
import { SlideshowCarousel } from '../../../src/components/atoms/card/SlideshowCarousel';

const MealCardStory = () => {
  return (
    <ScrollView>
      <FlexBox flexDirection='column' >
        <MealCard meal={MOCK_MEALS_ENRICHED[0]} onPress={() => { }} />
        <MealCard meal={MOCK_MEALS_ENRICHED[1]} onPress={() => { }} />
        <MealCard meal={MOCK_MEALS_ENRICHED[2]} onPress={() => { }} />
      </FlexBox>
    </ScrollView>
  )
}

const BigCardStory = () => {
  return (
    <ScrollView>
      <FlexBox flexDirection='column' >
        <BigCard meal={MOCK_MEALS_ENRICHED[0]} onPress={() => { }} />
        <BigCard meal={MOCK_MEALS_ENRICHED[1]} onPress={() => { }} />
        <BigCard meal={MOCK_MEALS_ENRICHED[2]} onPress={() => { }} />
      </FlexBox>
    </ScrollView>
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

const SlideshowCarouselStory = () => {
  const slideshowImages = MOCK_MEALS.map(
    (m) => { return m.image }
  )
  console.log(slideshowImages)
  return <SlideshowCarousel slides={slideshowImages} />
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
  .add('Big Card', () => BigCardStory())
  .add('Banner Card', () => BannerCardStory());

storiesOf('Carousel', module)
  .add('Carousel Less Info', () => CarouselLessInfoStory())
  .add('Carousel More Info', () => CarouselMoreInfoStory())
  .add('Slideshow Carousel', () => SlideshowCarouselStory());
