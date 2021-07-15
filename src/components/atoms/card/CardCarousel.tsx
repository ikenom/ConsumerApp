import { Box } from "../layout/Box"
import { MealCardType, Dimension, getMealCardLayoutDimensions } from "./util";
import Carousel from 'react-native-snap-carousel';
import { MealCard, MealCardProps } from "./Card";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React from 'react';
import { Meal } from "../../../models/meal/meal";

interface CardCarouselProps {
  layoutType: CardCarouselLayout;
  meals: Meal[];
  onPress: (mealViewProps: Meal) => void;
}

export type CardCarouselLayout = 'short' | 'tall'

export const CardCarousel = (props: CardCarouselProps) => {

  const { layoutType, meals, onPress } = props;
  const mealCardLayout = ((layoutType === 'short') ? 'horizontal' : 'vertical')
  const dimensions = getMealCardLayoutDimensions(mealCardLayout)

  //@ts-ignore
  const CardWrapper = ({item, index}) => {
    const meal = item as Meal;
    return(
      <MealCard 
        meal={meal}
        layoutType={mealCardLayout}
        onPress={onPress}
      />
    )
  }
  return(
    <Box height={dimensions.height} >
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
