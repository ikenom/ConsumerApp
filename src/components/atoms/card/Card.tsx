import React from 'react';
import {Text} from '../../atoms/typography/Text';
import {FlexBox, Box} from '../layout/Box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image, TouchableOpacity} from 'react-native';
import { MealCardType, Dimension, getMealCardLayoutDimensions } from './util';
import { Meal } from '../../../models/meal/meal';
import { defaultTheme } from '../../../defaultTheme';
import { MaterialCommunityIcon } from '../icons/matericalCommunictyIcon';

export interface MealCardProps {
  meal: Meal
  layoutType: MealCardType;
  onPress: (meal: Meal) => void;
}

export const MealCard = (props: MealCardProps) => {

  const { meal , layoutType, onPress } = props;

  const { name, restaurant, price, distance, image } = meal


  const dimensions: Dimension = getMealCardLayoutDimensions(layoutType)

  const onNavigate = () => {
    onPress(meal)
  };

  const truncateString = (str: String, limit: Number): String => {
    // Shorten string to specified length and add "..."
    if (str.length > limit) {
      return str.substring(0, limit) + "..."
    }
    else {
      return str
    }
  }

  const StatBox = (str: String) => {
    // Maybe make this into a component
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
      position={'absolute'}
      overflow={'hidden'}
      right={0}
      left={0}
      bottom={0}
      top={0}
      borderRadius={'15px'}>
      <TouchableOpacity activeOpacity={.5} onPress={onNavigate}>
        <Box height={dimensions.height} width={dimensions.width}>
          <Image style={{ flex: 1, height: undefined, width: undefined }} source={image} />
        </Box>
        <FlexBox
          top={-dimensions.contentHeight}
          bg={'#000000'}
          height={dimensions.contentHeight}
          padding={1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} 
          flexDirection={'column'} 
          justifyContent={'space-evenly'}>
          <Text fontWeight={'600'} fontSize={'14px'} color={'#FFFFFF'}>
            {truncateString(name, 20)}
          </Text>
            {(restaurant !== undefined) && (<Text
              height={hp('2%')}
              fontWeight={'500'}
              fontSize={'14px'}
              color={'#B7B7B7'}>
              {restaurant}
            </Text>)}
          <FlexBox width={wp('24%')} br={'25px'} mt={'2px'} alignContent={'center'} flexDirection={'row'}>
            {(price !== undefined) && StatBox(`$${price}`)}
            {(distance !== undefined) && StatBox(`${distance} mi`)}
          </FlexBox>
        </FlexBox>
      </TouchableOpacity>
    </Box>
  );
};

MealCard.displayName = 'Test Card';
