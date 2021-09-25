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
import { Entypo } from "../../../atoms/icons/entypo";


const StyledDivider = styled(Divider)`
  backgroundColor: ${defaultTheme.colors.whiteTwo};
  height: 2px;
  width: ${wp("14%")};
  marginLeft: auto;
  marginRight: auto;
  marginTop: 6px;
`;

type Icons = "back-arrow" | "share" | "info" | "skip";

interface OrderConfirmationHeaderProps {
  label: string
  leftIcon?: Icons;
  rightIcon?: Icons;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}

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
      return (<MaterialCommunityIcon name={"information"} size={40} color={defaultTheme.colors.white} />)
    }
    else {
      return (<MaterialCommunityIcon name={"help"} size={23} color='red' />)
    }
  }

  const leftPos = -wp('5%') // Left dimension for Box
  const rightPos = wp('82%');

  return (
    <Box>
      <FlexBox flexDirection={'column'} height={hp('3.5%')} ml={"auto"} mr={"auto"}>
        <Text fontWeight={'700'} fontSize={'18px'} color={defaultTheme.colors.white}>{label}</Text>
      </FlexBox>
      {leftIcon &&
        (<Box position={"absolute"} bottom={-hp('1.2%')} left={leftPos}>
          <Button
            buttonStyle={{ backgroundColor: 'transparent' }}
            onPress={onPressLeft}
            icon={getIcon(leftIcon)} />
        </Box>)}
      {rightIcon &&
        (<Box position={"absolute"} bottom={-hp('1.2%')} left={rightPos}>
          <Button
            buttonStyle={{ backgroundColor: 'transparent' }}
            onPress={onPressRight}
            icon={getIcon(rightIcon)} />
        </Box>)}
    </Box>
  )
}