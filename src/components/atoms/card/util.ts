import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Needs test
export const truncateString = (str: string, limit: number): string => {
  // Shorten string with "..." so that it is under the specified length
  if (str.length > limit) {
    return str.substring(0, (limit-3)) + "..."
  }
  else {
    return str
  }
}

export interface Dimension {
  width: number;
  height: number;
  contentHeight: number;
  truncateStrTo: number; // Num characters
}

export const MEAL_CARD_DIM: Dimension = {
  width: wp('48%'),
  height: hp('22%'),
  contentHeight: hp('6.7%'),
  truncateStrTo: 20
}

export const BANNER_CARD_DIM: Dimension = {
    width: wp('58%'),
    height: hp('13%'),
    contentHeight: hp('5%'),
    truncateStrTo: 30
}