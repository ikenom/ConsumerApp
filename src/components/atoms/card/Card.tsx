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

export interface MealCardProps {
  meal: Meal
  layoutType: MealCardType;
  onPress: (meal: Meal) => void;
}

export const MealCard = (props: MealCardProps) => {

  const { meal , layoutType, onPress } = props;

  const { name, price, image } = meal


  const dimensions: Dimension = getMealCardLayoutDimensions(layoutType)

  const onNavigate = () => {
    onPress(meal)
  };

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
            <Image style={{flex: 1, height: undefined, width: undefined}} source={image} />
          </Box>
          <FlexBox top={-dimensions.contentHeight} bg={'#000000'} height={dimensions.contentHeight} padding={1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <Text fontWeight={'600'} fontSize={'14px'} color={'#FFFFFF'}>
            {name}
            </Text>
            <FlexBox bg={'#464545'} width={wp('12%')} br={'25px'} mt={'2px'} alignContent={'center'} flexDirection={'row'}>
              <Text height={hp('2%')} fontWeight={'300'} fontSize={'12px'} color={'#FFFFFF'}>
                {`$${price}`}
              </Text>
            </FlexBox>
          </FlexBox>
        </TouchableOpacity>
      </Box>
  );
};

MealCard.displayName = 'Test Card';
