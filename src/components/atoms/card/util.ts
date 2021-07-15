import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export type MealCardType = 'horizontal' | 'vertical' | 'random-height';

const VERTICAL_DIM: Dimension = {
  width: wp('44%'),
  height: hp('22%'),
  contentHeight: hp('6.7%'), 
  truncateMealTo: 19,
  truncateRestaurantTo: 19
}

const HORIZONTAL_DIM: Dimension = {
  width: wp('58%'),
  height: hp('13%'),
  contentHeight: hp('5%'), 
  truncateMealTo: 27,
  truncateRestaurantTo: 25,
}

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
}

export const getMealCardLayoutDimensions = (layoutType: MealCardType): Dimension => {
  if (layoutType === 'horizontal') {
    return HORIZONTAL_DIM;
  }
  else if (layoutType === 'vertical') {
    return VERTICAL_DIM;
  }
  else { // Random height
    const randomHeight = generateRandomNumber(22,33);
    return({
      width: wp('48%'),
      height: hp(randomHeight),
      contentHeight: hp('6.7%'), 
      truncateMealTo: 20,
      truncateRestaurantTo: 20,
    })
  }
}

export interface Dimension {
  width: number;
  height: number;
  contentHeight: number;
  truncateMealTo: number;
  truncateRestaurantTo: number;
} 