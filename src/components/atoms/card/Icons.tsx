import React from "react";
import { Box, FlexBox } from "../layout/Box";
import FlaggedIngredient from "../../../../assets/svg/FlaggedIngredient.svg";
import ExcludedIngredient from "../../../../assets/svg/ExcludedIngredient.svg";


interface IconsProps {
  isFlagged: boolean | undefined;
  containsExcluded: boolean | undefined;
}

export const Icons = (props: IconsProps) => {
  const { isFlagged, containsExcluded } = props;
  return (
    <FlexBox flexDirection={'row'}>
      {isFlagged &&
        (<Box><FlaggedIngredient /></Box>)}
      {containsExcluded &&
        (<Box pl={'8px'}><ExcludedIngredient /></Box>)}
    </FlexBox>
  );
}