import React from "react";
import { Text } from '../../atoms/typography/Text';
import { defaultTheme } from "../../../defaultTheme";
import { Box } from "../layout/Box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const StatBox = (props: { string: string }) => {
  // Small gray box that contains price or distance
  return (
    <Box backgroundColor={defaultTheme.colors.greyNine} mr={wp('1.2%')} borderRadius='6px' >
      <Text
        height={hp('2%')}
        fontWeight={'400'}
        fontSize={'14px'}
        color={'#FFFFFF'}
        mt={wp('1.1%')}
        mb={wp('1.1%')}
        mr={wp('1.4%')}
        ml={wp('1.4%')} >
        {props.string}
      </Text>
    </Box>
  );
}