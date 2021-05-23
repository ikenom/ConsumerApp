import React from 'react';
import {Text} from '../../atoms/typography/Text';
import {FlexBox, Box} from '../layout/Box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image} from 'react-native';
import { MealCardType, Dimension, getMealCardLayoutDimensions } from './util';
import { Meal } from '../../../models/meal/meal';

export interface MealCardProps {
  mealName: string;
  price: string;
  image: any;
  layoutType: MealCardType;
}

export const mealToMealCardProp = (meal: Meal): Omit<MealCardProps, 'layoutType'> => {
  return {
    mealName: meal.name,
    price: meal.price,
    image: meal.image,
  }
}

export const MealCard = (props: MealCardProps) => {

  const { mealName, price, image, layoutType } = props;

  const dimensions: Dimension = getMealCardLayoutDimensions(layoutType)
  return (
    <Box
      position={'absolute'}
      overflow={'hidden'}
      right={0}
      left={0}
      bottom={0}
      top={0}
      borderRadius={'15px'}>
      <Box height={dimensions.height} width={dimensions.width}>
        <Image style={{flex: 1, height: undefined, width: undefined}} source={image} />
      </Box>
      <FlexBox top={-dimensions.contentHeight} bg={'#000000'} height={dimensions.contentHeight} padding={1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <Text fontWeight={'600'} fontSize={'14px'} color={'#FFFFFF'}>
        {mealName}
        </Text>
        <FlexBox bg={'#464545'} width={wp('12%')} br={'25px'} mt={'2px'} alignContent={'center'} flexDirection={'row'}>
          <Text height={hp('2%')} fontWeight={'300'} fontSize={'12px'} color={'#FFFFFF'}>
            {`$${price}`}
          </Text>
        </FlexBox>
      </FlexBox>
    </Box>
  );
};

MealCard.displayName = 'Test Card';
