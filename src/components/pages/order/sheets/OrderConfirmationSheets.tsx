import React from "react"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { defaultTheme } from "../../../../defaultTheme"
import { ExpandableAccordion, SheetHeader } from "../../../molecules/common/BottomExpandableAccordion"
import { NutritionFactsSheetProps, NutritionFactsSheetContent } from "./NutritionFactsSheetContent"
import { PickUpInstructionsSheetProps, PickUpInstructionsSheetContent} from "./PickUpInstructionsSheetContent"

export const PickUpInstructionsBottomSheet = (props: PickUpInstructionsSheetProps) => {
    const { order, customerFullName } = props;
    const { orderNumber, lineItems } = order
  return(
    <ExpandableAccordion label={"Pick up Instructions"} backgroundColor={defaultTheme.colors.blackTwo} childHeight={hp('32%')}>
      <PickUpInstructionsSheetContent customerFullName={customerFullName} order={{orderNumber, lineItems}}/>
    </ExpandableAccordion> 
  )
}

export const NutritionFactsBottomSheet = (props: NutritionFactsSheetProps) => {
  const { nutrition } = props;
return(
  <ExpandableAccordion label={"Nutritional Facts"} backgroundColor={defaultTheme.colors.blackTwo} childHeight={hp('80%')}>
    <NutritionFactsSheetContent nutrition={nutrition}/>
  </ExpandableAccordion> 
)
}