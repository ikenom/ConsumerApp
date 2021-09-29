import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Divider } from 'react-native-elements';
import styled from "styled-components";
import { Button } from "react-native-elements";
import { defaultTheme } from "../../../../defaultTheme";
import { Box, FlexBox, FlexItem } from "../../../atoms/layout/Box";
import { Text } from "../../../atoms/typography/Text";
import { MaterialCommunityIcon } from "../../../atoms/icons/matericalCommunictyIcon";

const StyledDivider = styled(Divider)`
  backgroundColor: ${defaultTheme.colors.whiteTwo};
  height: 2px;
  width: ${wp("14%")};
  marginLeft: auto;
  marginRight: auto;
  marginTop: 6px;
`;

type Icons = "back-arrow" | "share" | "info" | "skip" | "close";

interface OrderConfirmationHeaderProps {
  label: string
  leftIcon?: Icons;
  rightIcon?: Icons;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}

// ORG Move and rename

export const OrderConfirmationHeader = (props: OrderConfirmationHeaderProps) => {
  const { label, leftIcon, rightIcon, onPressLeft, onPressRight } = props;

  const getIcon = (icon: Icons) => {
    if (icon === "back-arrow") {
      return (<MaterialCommunityIcon name={"chevron-left"} size={40} color={defaultTheme.colors.white} />)
    }
    if (icon === "share") {
      return (<MaterialCommunityIcon name={"export-variant"} size={24} color={defaultTheme.colors.white} />)
    }
    if (icon === "info") {
      return (<MaterialCommunityIcon name={"information"} size={24} color={defaultTheme.colors.white} />)
    }
    if (icon === "close") {
      return (<MaterialCommunityIcon name={"close"} size={24} color={defaultTheme.colors.white} />)
    }
    else {
      return (<MaterialCommunityIcon name={"help"} size={23} color='red' />)
    }
  }

  const getLeftIconPosition = (icon: Icons) => {
    if (icon === "back-arrow") {
      return { left: -wp('5%'), bottom: -hp('1.2%') }
    }
    if (icon === "share") {
      return { left: -wp('3%'), bottom: hp('0%') }
    }
    if (icon === "info") {
      return { left: -wp('2.5%'), bottom: -hp('0.1%') }
    }
    else {
      return { left: -wp('2.8%'), bottom: -hp('0%') }
    }
  }

  const getRightIconPosition = (icon: Icons) => {
    if (icon === "back-arrow") {
      return { left: wp('87%'), bottom: -hp('1.2%') }
    }
    if (icon === "share") {
      return { left: wp('82.5%'), bottom: -hp('0%') }
    }
    if (icon === "info") {
      return { left: wp('89%'), bottom: -hp('0.2%') }
    }
    if (icon === "close") {
      return { left: wp('89%'), bottom: -hp('0.3%') }
    }
    else {
      return { left: wp('89%'), bottom: -hp('0%') }
    }
  }

  const leftPos = getLeftIconPosition(leftIcon)
  const rightPos = getRightIconPosition(rightIcon)

  return (
    <Box>
      <FlexBox flexDirection={'column'} height={hp('3.5%')} ml={"auto"} mr={"auto"}>
        <Text fontWeight={'700'} fontSize={'18px'} color={defaultTheme.colors.white}>{label}</Text>
      </FlexBox>
      {leftIcon &&
        (<Box 
        position={"absolute"} 
        bottom={leftPos.bottom} 
        left={leftPos.left}>
          <Button
            buttonStyle={{ backgroundColor: 'transparent' }}
            onPress={onPressLeft}
            icon={getIcon(leftIcon)} />
        </Box>)}
      {rightIcon &&
        (<Box 
        position={"absolute"} 
        bottom={rightPos.bottom} 
        left={rightPos.left}>
          <Button
            buttonStyle={{ backgroundColor: 'transparent' }}
            onPress={onPressRight}
            icon={getIcon(rightIcon)} />
        </Box>)}
    </Box>
  )
}