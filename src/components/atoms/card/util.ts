import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export type MealCardType = 'horizontal' | 'vertical';

export const VERTICAL_DIM: Dimension = {
  width: wp('44%'),
  height: hp('23%'),
  contentHeight: hp('6.7%')
}

export const HORIZONTAL_DIM: Dimension = {
  width: wp('58%'),
  height: hp('18%'),
  contentHeight: hp('5%')
}

export const getMealCardLayoutDimensions = (layoutType: MealCardType): Dimension => {
  return layoutType === 'horizontal' ? HORIZONTAL_DIM : VERTICAL_DIM;
}

export interface Dimension {
  width: number;
  height: number;
  contentHeight: number;
} 