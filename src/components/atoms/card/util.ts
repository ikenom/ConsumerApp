import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export type MealCardType = 'horizontal' | 'vertical';

const VERTICAL_DIM: Dimension = {
  width: wp('48%'),
  height: hp('22%'),
  contentHeight: hp('6.7%'), 
  truncateStrTo: 20
}

const HORIZONTAL_DIM: Dimension = {
  width: wp('58%'),
  height: hp('13%'),
  contentHeight: hp('5%'), 
  truncateStrTo: 30
}

export const truncateString = (str: string, limit: number): string => {
  // Shorten string with "..." so that it is under the specified length
  if (str.length > limit) {
    return str.substring(0, (limit-3)) + "..."
  }
  else {
    return str
  }
}

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
}

export const getMealCardLayoutDimensions = (layoutType: MealCardType): Dimension => {
  if (layoutType === 'horizontal') {
    return HORIZONTAL_DIM;
  }
  else {
    return VERTICAL_DIM;
  }
}

export interface Dimension {
  width: number;
  height: number;
  contentHeight: number;
  truncateStrTo: number; // Num characters
} 