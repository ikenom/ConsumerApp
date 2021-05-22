import { Box } from "../layout/Box"
import { MealCardType, Dimension, getMealCardLayoutDimensions } from "./util";
import Carousel from 'react-native-snap-carousel';
import { MealCard, MealCardProps } from "./Card";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React from 'react';

interface CardCarouselProps {
  layoutType: MealCardType;
  meals: Omit<MealCardProps, 'layoutType'>[];
}

export const CardCarousel = (props: CardCarouselProps) => {

  const { layoutType, meals } = props;
  const dimensions: Dimension = getMealCardLayoutDimensions(layoutType)

  //@ts-ignore
  const CardWrapper = ({item, index}) => {
    const meal = item as MealCardProps;
    return(
      <MealCard 
        mealName={meal.mealName} 
        price={meal.price} 
        image={meal.image}
        layoutType={layoutType}
      />
    )
  }
  return(
    <Box height={dimensions.height} p={2}>
      <Carousel 
        vertical={layoutType === 'vertical'}
        data={meals} 
        renderItem={CardWrapper} 
        sliderWidth={wp('95%')} 
        itemWidth={dimensions.width}
        enableMomentum={true} 
        enableSnap={true}
        windowSize={10}/>
    </Box>
  )
}
