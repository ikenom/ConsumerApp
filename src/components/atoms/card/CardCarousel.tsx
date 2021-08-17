import { Box } from "../layout/Box"
import { MealCardType, getMealCardLayoutDimensions } from "./util";
import Carousel from 'react-native-snap-carousel';
import { MealCard, MealCardProps } from "./Card";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React from 'react';
import { Meal } from "../../../models/meal/meal";

export interface CardCarouselProps {
  layoutType: CardCarouselLayout;
  mealCardData: MealCardProps[];
  onPress: (mealViewProps: Meal) => void;
}

export interface MealCardData {
  meal: Meal;

}

export type CardCarouselLayout = 'short' | 'tall'

export const CardCarousel = (props: CardCarouselProps) => {

  const { layoutType, mealCardData, onPress } = props;
  const mealCardLayout:MealCardType = ((layoutType === 'short') ? 'horizontal' : 'vertical')
  const dimensions = getMealCardLayoutDimensions(mealCardLayout)

  //@ts-ignore
  const CardWrapper = ({item, index}) => {
    return(
      <MealCard 
        meal={item.meal}
        displayDistance={item.displayDistance}
        layoutType={mealCardLayout}
        onPress={onPress}
        flagged={item.flagged} 
        restaurantName={item.restaurantName} 
      />
    )
  }
  return(
    <Box height={dimensions.height} >
      <Carousel 
        firstItem={1}
        vertical={false}
        data={mealCardData} 
        renderItem={CardWrapper} 
        sliderWidth={wp('94%')} 
        itemWidth={dimensions.width}
        enableMomentum={true} 
        activeSlideOffset={0}
        windowSize={10}/>
    </Box>
  )
}
