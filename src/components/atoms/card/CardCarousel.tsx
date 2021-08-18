import { Box } from "../layout/Box"
import { MealCardType, getMealCardLayoutDimensions } from "./util";
import Carousel from 'react-native-snap-carousel';
import { MealCard, MealCardData } from "./Card";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React from 'react';
import { Meal } from "../../../models/meal/meal";

export interface CardCarouselProps {
  layoutType: CardCarouselLayout;
  mealCards: MealCardData[];
  onPress: (mealViewProps: Meal) => void;
}

export type CardCarouselLayout = 'short' | 'tall'

export const CardCarousel = (props: CardCarouselProps) => {

  const { layoutType, mealCards, onPress } = props;
  const mealCardLayout:MealCardType = ((layoutType === 'short') ? 'horizontal' : 'vertical')
  const dimensions = getMealCardLayoutDimensions(mealCardLayout)

  //@ts-ignore
  const CardWrapper = ({item, index}) => {
    return(
      <MealCard 
        mealCardData={item}
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
        data={mealCards} 
        renderItem={CardWrapper} 
        sliderWidth={wp('94%')} 
        itemWidth={dimensions.width}
        enableMomentum={true} 
        activeSlideOffset={0}
        windowSize={10}/>
    </Box>
  )
}
