import React from "react";
import { MaterialCommunityIcon } from "../icons/matericalCommunictyIcon";
import { FlexBox } from "../layout/Box";


interface IconsProps {
  creatorPicture?: string;
  isFlagged: boolean | undefined;
  containsExcluded: boolean | undefined;
}

export const Icons = (props: IconsProps) => {
  const { creatorPicture, isFlagged, containsExcluded } = props;
  return (
    <FlexBox flexDirection={'row'}>
      {isFlagged &&
        (<MaterialCommunityIcon name={'flag-variant'} color={'#EDCD27'} size={27} />)}
      {containsExcluded &&
        (<MaterialCommunityIcon name={'cancel'} color={'red'} size={27} />)}
    </FlexBox>
  );
}