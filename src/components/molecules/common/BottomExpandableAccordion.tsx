import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Divider } from 'react-native-elements';
import {
  TouchableOpacity, TouchableWithoutFeedback,
} from 'react-native'
import styled from "styled-components";
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

import { Box, FlexBox } from "../../atoms/layout/Box";
import { defaultTheme } from "../../../defaultTheme";
import { Text } from "../../atoms/typography/Text";

const StyledDivider = styled(Divider)`
  backgroundColor: ${defaultTheme.colors.blackGreyOne};
  height: 4px;
  width: ${wp("8.9%")};
  borderRadius: 4px;
`;


export interface ExpandableAccordionProps {
  backgroundColor: string;
  label: string;
  children: JSX.Element;
  childHeight: number;
}

export const ExpandableAccordion = (props: ExpandableAccordionProps) => {

  const { label, backgroundColor, children, childHeight } = props;
  
  const sheetRef = React.useRef<any>();

  const onBackgroundTouch = () => {
    sheetRef.current.snapTo(1)
    setShowContent(false)
  }

  const onHeaderPress = () => {
    sheetRef.current.snapTo(0)
    setShowContent(true)
  }

  const [showContent, setShowContent] = useState(false);

  const value = new Animated.Value(hp('4%'));

  return(
    <>
        <TouchableSheetHeader label={label} backgroundColor={backgroundColor} onPress={onHeaderPress}/>
        <BottomSheet
          ref={sheetRef}
          enabledGestureInteraction={true}
          snapPoints={[childHeight, 0]}
          initialSnap={1} 
          borderRadius={7}
          enabledBottomInitialAnimation={true}
          contentPosition={value}
          renderContent={ showContent ? () => children : () => <></>}
        />
        {showContent ? <Shadow onPress={onBackgroundTouch}/> : <></>}
    </>
  )
}

interface HeaderProps {
  onPress: () => void;
  label: string;
  backgroundColor: string;
}

const TouchableSheetHeader = (props: HeaderProps) => (
  <TouchableOpacity activeOpacity={.8} onPress={props.onPress}>
    <FlexBox bg={props.backgroundColor} width={wp("100%")} height={hp("7.5%")} alignItems={'center'} justifyContent={"space-between"} pt={hp("1%")} borderRadius={"7px"} pb={hp("2.2%")}>
      <StyledDivider />
      <Text fontWeight='600' fontSize={'18px'} color={defaultTheme.colors.white}>{props.label}</Text>
    </FlexBox>
  </TouchableOpacity>
)

export const SheetHeader = (props: Omit<HeaderProps, "onPress">) => (
  <FlexBox bg={props.backgroundColor} width={wp("100%")} height={hp("7.5%")} alignItems={'center'} justifyContent={"space-between"} pt={hp("1%")} borderRadius={"7px"} pb={hp("2.2%")} pl={wp('5.5%')} pr={wp('5.5%')}>
    <StyledDivider />
    <Text fontWeight='600' fontSize={'18px'} color={defaultTheme.colors.white}>{props.label}</Text>
  </FlexBox>
)

interface ShadowProps {
  onPress: () => void;
}

const Shadow = (props: ShadowProps) => {
  return (
    <TouchableWithoutFeedback  onPress={props.onPress}>
      <Box height={hp("100%")} width={wp("100%")} opacity={.5} bg={"#000"} position={'absolute'}/>
    </TouchableWithoutFeedback>
  )
}


