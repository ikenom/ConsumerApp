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

type IconPosition = "left" | "right";

type IconType = "chevron-left" | "cross"

interface OrderConfirmationHeaderProps {
  label: string
  icon: IconType
  iconPosition: IconPosition
  onPress: () => void
}

export const OrderConfirmationHeader = (props: OrderConfirmationHeaderProps) => {
  const { label, icon, iconPosition, onPress } = props;

  const leftPos = iconPosition === 'left' ? -wp('5%') : wp('82%');

  const Icon = icon === 'chevron-left' 
    ?
      <MaterialCommunityIcon name={icon} size={40} color={defaultTheme.colors.white}/>
    :
      <Entypo name={icon} size={40} color={defaultTheme.colors.white}/>
  return(
    <Box>
      <FlexBox flexDirection={'column'} height={hp('3.5%')} ml={"auto"} mr={"auto"}>
      <Text fontWeight={'700'} fontSize={'18px'} color={defaultTheme.colors.white}>{label}</Text>
      </FlexBox>
      <Box position={"absolute"} bottom={-hp('1.2%')} left={leftPos}>
        <Button 
          buttonStyle={{backgroundColor: 'transparent'}} 
          onPress={onPress} 
          icon={Icon}
        />
      </Box> 
    </Box>
  )
}