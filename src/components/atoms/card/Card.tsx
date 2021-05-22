import React from 'react';
import {Text} from '../../atoms/typography/Text';
import {FlexBox, Box} from '../layout/Box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Image} from 'react-native';

type MealCardType = 'horizontal' | 'vertical';

const VERTICAL_DIM: Dimension = {
  width: wp('44%'),
  height: hp('23%'),
  contentHeight: hp('6.7%')
}

const HORIZONTAL_DIM: Dimension = {
  width: wp('58%'),
  height: hp('18%'),
  contentHeight: hp('5%')
}

interface Dimension {
  width: number;
  height: number;
  contentHeight: number;
} 
interface MealCardProps {
  mealName: string;
  price: string;
  image: any;
  type: MealCardType;
}

export const MealCard = (props: MealCardProps) => {

  const { mealName, price, image, type } = props;

  const dimensions: Dimension = type === 'horizontal' ? HORIZONTAL_DIM : VERTICAL_DIM
  return (
    <Box
      height={dimensions.height}
      width={dimensions.width}
      position={'absolute'}
      overflow={'hidden'}
      right={0}
      left={0}
      bottom={0}
      top={0}
      borderRadius={'25px'}>

      <Image style={{flex: 1, height: undefined, width: undefined}} source={image} />

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
