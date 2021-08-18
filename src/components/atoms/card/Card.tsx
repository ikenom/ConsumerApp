import React from 'react';
import {Text} from '../../atoms/typography/Text';
import {FlexBox, Box} from '../layout/Box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image, TouchableOpacity} from 'react-native';
import { MealCardType, Dimension, getMealCardLayoutDimensions, truncateString } from './util';
import { Meal } from '../../../models/meal/meal';
import { defaultTheme } from '../../../defaultTheme';
import { MaterialCommunityIcon } from '../icons/matericalCommunictyIcon';

export interface MealCardProps {
  mealCardData: MealCardData;
  layoutType: MealCardType;
  onPress: (meal: Meal) => void;
}

export interface MealCardData {
  meal: Meal;
  restaurantName?: string;
  flagged?: boolean;
}

export const MealCard = (props: MealCardProps) => {

  const { mealCardData, layoutType, onPress } = props;
  const { meal, restaurantName, flagged } = mealCardData;


  const dimensions: Dimension = getMealCardLayoutDimensions(layoutType)

  const onNavigate = () => {
    onPress(meal)
  };

  const StatBox = (str: string) => {
    // Small gray box that contains price or distance
    return (
      <Box backgroundColor={defaultTheme.colors.greyNine} mr={wp('1.2%')}>
        <Text
          height={hp('2%')}
          fontWeight={'300'}
          fontSize={'12px'}
          color={'#FFFFFF'}
          mr={wp('1.2%')}
          ml={wp('1.2%')}>
          {str}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      height={dimensions.height}
      width={dimensions.width}
      overflow={'hidden'}
      borderRadius={'10px'}>
      <TouchableOpacity activeOpacity={.5} onPress={onNavigate}>
        <Box
          height={dimensions.height}
          width={dimensions.width}
          overflow={'hidden'} >
          <Image style={{ flex: 1, height: undefined, width: undefined }} source={{uri: meal.image}} />
        </Box>
        <FlexBox
          top={-dimensions.contentHeight}
          bg={'#000000'}
          height={dimensions.contentHeight}
          width={dimensions.width}
          overflow={'hidden'}
          padding={1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          flexDirection={'column'}
          justifyContent={'space-evenly'}>
          <Text fontWeight={'600'} fontSize={'14px'} color={'#FFFFFF'}>
            {truncateString(meal.name, dimensions.truncateMealTo)}
          </Text>
          {restaurantName  &&
            (<Text
              height={hp('2%')}
              fontWeight={'500'}
              fontSize={'14px'}
              color={'#B7B7B7'}>
              {truncateString(restaurantName, dimensions.truncateRestaurantTo)}
            </Text>)}
          <FlexBox width={wp('24%')} br={'25px'} mt={'2px'} alignContent={'center'} flexDirection={'row'}>
            {StatBox(`$${meal.price}`)}
            {meal.distance && StatBox(`${meal.distance} mi`)}
          </FlexBox>
        </FlexBox>
        {flagged &&
          (<Box position={'absolute'} right={10} top={145}>
            <MaterialCommunityIcon name={'flag-variant'} color={'#EDCD27'} size={28} />
          </Box>)}
      </TouchableOpacity>
    </Box>
  );
};

MealCard.displayName = 'Meal Card';
