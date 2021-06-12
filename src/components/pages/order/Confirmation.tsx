import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PickUpInstructionsBottomSheet, NutritionFactsBottomSheet } from './sheets/OrderConfirmationSheets';
import { FlexBox } from '../../atoms/layout/Box';
import { defaultTheme } from '../../../defaultTheme';
import { Text } from '../../atoms/typography/Text';
import { MOCK_NUTRITION } from '../../../models/meal/util';

export const Confirmation = () => (
  <FlexBox flexDirection={'column'} bg={defaultTheme.colors.black} width={wp("100%")} height={hp('92%')} justifyContent={'space-between'}>
    <FlexBox flexDirection={'column'}>
      <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.xlg} color={defaultTheme.colors.white}>
        Bleh
      </Text>
    </FlexBox>
    <FlexBox flexDirection={'column'}>
      <NutritionFactsBottomSheet nutrition={MOCK_NUTRITION}/>
      <PickUpInstructionsBottomSheet customerFullName={"Travis Davidson"} order={{ orderNumber: "12345", lineItems: [{ price: "13.50", name: "Blackened Salmon Fillet" }] }} />
    </FlexBox>
  </FlexBox>
)