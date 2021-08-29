import React from 'react';
import {Text} from '../../atoms/typography/Text';
import {FlexBox, Box} from '../layout/Box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image, TouchableOpacity} from 'react-native';
import { MealCardType, Dimension, getMealCardLayoutDimensions, truncateString } from './util';
import { Meal, EnrichedMeal } from '../../../models/meal/meal';
import { defaultTheme } from '../../../defaultTheme';
import RestaurantStore from '../../../store/restaurantStore';
import { StatBox } from './StatBox';
import { Icons } from './Icons';

export interface MealCardProps {
  meal: EnrichedMeal;
  layoutType: MealCardType;
  hideDistance?: boolean;
  onPress: (meal: Meal) => void;
}

export const MealCard = (props: MealCardProps) => {

  const { meal, layoutType, onPress, hideDistance } = props;
  const { image, name, price, restaurantId, restaurantName, isFlaggedIngredient, containsExcludedIngredients } = meal;


  const dimensions: Dimension = getMealCardLayoutDimensions(layoutType)

  const onNavigate = () => {
    onPress(meal)
  };

  const getRestaurantDistance = (restaurantId: string) => {
    const restaurantStore = RestaurantStore.getInstance()
    return restaurantStore.getRestaurantById(restaurantId)?.distance
  }

  const distance = getRestaurantDistance(restaurantId)

  return (
    <FlexBox
      backgroundColor={defaultTheme.colors.blackTwo}
      width={dimensions.width}
      flexDirection='column'
      overflow={'hidden'}
      borderRadius={'10px'}>
      <TouchableOpacity activeOpacity={.5} onPress={onNavigate}>
        <Box
          height={dimensions.height}
          width={dimensions.width}
          overflow={'hidden'} >
          <Image style={{ flex: 1, height: undefined, width: dimensions.width }} source={{ uri: image }} />
        </Box>
        <FlexBox
          overflow={'hidden'}
          padding={1}
          flexDirection={'column'}
          justifyContent={'space-evenly'}
          pl={wp('2.0%')}
          pr={wp('2.0%')}
          pb={hp('1.3%')}>
          <Text fontWeight={'600'} fontSize={'16px'} color={'#FFFFFF'} mb={hp('0.75%')}>
            {name}
          </Text>
          {restaurantName &&
            (<Text
              height={hp('2%')}
              fontWeight={'500'}
              fontSize={'15px'}
              color={'#B7B7B7'}
              mb={hp('0.9%')}>
              {restaurantName}
            </Text>)}
          <FlexBox
            width={wp('24%')}
            br={'25px'}
            mt={'2px'}
            alignContent={'center'}
            flexDirection={'row'}
            mb={hp('1.2%')}>
            <StatBox string={`$${price}`} />
            {!hideDistance && distance && (<StatBox string={`${distance} mi`} />)}
          </FlexBox>
          {isFlaggedIngredient && containsExcludedIngredients &&
            (<Icons isFlagged={isFlaggedIngredient} containsExcluded={containsExcludedIngredients} />)}
        </FlexBox>
      </TouchableOpacity>
    </FlexBox>
  );
};

MealCard.displayName = 'Meal Card';
