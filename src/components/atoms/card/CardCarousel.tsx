import { Box } from "../layout/Box"
import Carousel from 'react-native-snap-carousel';
import { MealCard } from "./Card";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React from 'react';
import { Meal, EnrichedMeal } from "../../../models/meal/meal";
import { MEAL_CARD_DIM } from "./util";

export interface CardCarouselProps {
  meals: EnrichedMeal[];
  hideDistance?: boolean;
  onPress: (mealViewProps: Meal) => void;
}

// ORG Move to molecules

export const CardCarousel = (props: CardCarouselProps) => {

  const { meals, hideDistance, onPress } = props;
  const dimensions = MEAL_CARD_DIM // For carousel to adapt to meal card

  //@ts-ignore
  const CardWrapper = ({item, index}) => {
    return(
      <MealCard 
        meal={item}
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
