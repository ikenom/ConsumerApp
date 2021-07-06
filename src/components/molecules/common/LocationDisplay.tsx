import React from "react";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Location } from "../../../models/restaurant/restaurant";
import { FlexBox } from "../../atoms/layout/Box";
import { Text } from "../../atoms/typography/Text";
import {defaultTheme } from "../../../defaultTheme";

interface Props {
  location: Location;
  highlighted: boolean;
}

export const LocationDisplay = (props: Props) => {

  const { location, highlighted } = props;
  return (
    <FlexBox fontSize={defaultTheme.fontSize.m} flexDirection={'column'}>
      <Text 
        color={highlighted ? defaultTheme.colors.blue : defaultTheme.colors.white} 
        style={highlighted ? {textDecorationLine: 'underline'}: {}}
      >
        {`${location.street}`}
      </Text>
      <Text 
        color={highlighted ? defaultTheme.colors.blue : defaultTheme.colors.white} 
        style={highlighted ? {textDecorationLine: 'underline'}: {}}
      >
        {`${location.city}, ${location.state} ${location.zipCode}`}
      </Text>
    </FlexBox>
  )
}