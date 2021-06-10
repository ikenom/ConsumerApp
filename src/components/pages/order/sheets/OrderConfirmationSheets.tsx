import React from "react"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { defaultTheme } from "../../../../defaultTheme"
import { Nutrition } from "../../../../models/meal/meal"
import { Order } from "../../../../models/order/order"
import { FlexBox } from "../../../atoms/layout/Box"
import { Text } from "../../../atoms/typography/Text"
import { ExpandableAccordion, SheetHeader } from "../../../molecules/common/BottomExpandableAccordion"

interface NutritionFactsSheetProps {
  nutrition: Nutrition;
}

export const NutritionFactsSheet = (props: NutritionFactsSheetProps) => {

}

interface PickUpInstructionsSheetProps {
  customerFullName: string;
  order: Order;
}

export const PickUpInstructionsSheet = (props: PickUpInstructionsSheetProps) => {

  const { customerFullName, order } = props;
  const { lineItems , orderNumber} = order;

  const firstItem = lineItems[0];

  return (
    <FlexBox flexDirection={'column'} justifyContent={'space-between'} backgroundColor={defaultTheme.colors.blackTwo} pl={wp('5.5%')} pr={wp('5.5%')}>
        <SheetHeader label={"Pick up Instructions"} backgroundColor={defaultTheme.colors.blackTwo}/>
        <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>Please display to claim your order</Text>
        <FlexBox flexDirection={'row'} justifyContent={'space-between'} mt={hp("2.4%")}>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>Consumer Name</Text>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>{customerFullName}</Text>
        </FlexBox>
        <FlexBox flexDirection={'row'} justifyContent={'space-between'} mt={hp("1.5%")}>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>Order Number</Text>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>{`#${orderNumber}`}</Text>
        </FlexBox>
        <FlexBox flexDirection={'column'} justifyContent={'space-between'} mt={hp("1.5%")}>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>Items</Text>
          <FlexBox flexDirection={'row'} justifyContent={'space-between'} mt={hp("1%")} mb={hp("10%")}>
            <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.sm} color={defaultTheme.colors.white}>{firstItem.name}</Text>
            <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.sm} color={defaultTheme.colors.white}>{`$${firstItem.price}`}</Text>
          </FlexBox>
        </FlexBox>
    </FlexBox>
  )
}

export const PickUpInstructionsBottomSheet = (props: PickUpInstructionsSheetProps) => {
    const { order, customerFullName } = props;
    const { orderNumber, lineItems } = order
  return(
    <ExpandableAccordion label={"Pick up Instructions"} backgroundColor={defaultTheme.colors.blackTwo} childHeight={hp('40%')}>
      <PickUpInstructionsSheet customerFullName={customerFullName} order={{orderNumber, lineItems}}/>
    </ExpandableAccordion> 
  )
}