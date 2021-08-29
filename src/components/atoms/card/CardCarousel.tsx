import { Box } from "../layout/Box"
import { MealCardType, getMealCardLayoutDimensions } from "./util";
import Carousel from 'react-native-snap-carousel';
import { MealCard } from "./Card";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React from 'react';
import { Meal, EnrichedMeal } from "../../../models/meal/meal";

export interface CardCarouselProps {
  layoutType: CardCarouselLayout;
  meals: EnrichedMeal[];
  hideDistance?: boolean;
  onPress: (mealViewProps: Meal) => void;
}

export type CardCarouselLayout = 'short' | 'tall'

export const CardCarousel = (props: CardCarouselProps) => {

  const { layoutType, meals, hideDistance, onPress } = props;
  const mealCardLayout:MealCardType = ((layoutType === 'short') ? 'horizontal' : 'vertical')
  const dimensions = getMealCardLayoutDimensions(mealCardLayout)

  //@ts-ignore
  const CardWrapper = ({item, index}) => {
    return(
      <MealCard 
        meal={item}
        layoutType={mealCardLayout}
        hideDistance={hideDistance}
        onPress={onPress}
      />
    )
  }
  return(
    <Box>
      <Carousel 
        firstItem={1}
        vertical={false}
        data={meals} 
        renderItem={CardWrapper} 
        sliderWidth={wp('94%')} 
        itemWidth={dimensions.width}
        enableMomentum={true} 
        activeSlideOffset={0}
        windowSize={10}/>
    </Box>
  )
}
