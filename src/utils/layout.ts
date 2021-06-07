import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const getWidthInPixels = (percentageOfScreen: string): string => `${wp(percentageOfScreen)}px`;

export const getHeightInPixels = (percentageOfScreen: string): string => `${hp(percentageOfScreen)}px`;