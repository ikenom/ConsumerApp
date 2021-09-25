import { Image } from 'react-native';
import React from 'react';
import { defaultTheme } from '../../../defaultTheme';
import { Box, FlexBox } from '../../atoms/layout/Box';
import { Text } from '../../atoms/typography/Text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { OrderConfirmationHeader } from '../order/common/OrderConfirmationHeader';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../../../navigator/HomeStack';

export interface FeaturedViewProps {
  title: string;
  subtitle: string;
  imageUri: string;
  text: string;
  navigation?: StackNavigationProp<HomeStackParamList, 'Featured'>;
}

export const FeaturedNavContainer = (props: StackScreenProps<HomeStackParamList, 'Featured'>) => {
  const { navigation, route } = props;
  return(
    <FeaturedView {...route.params} navigation={navigation} />
  )
}

export const FeaturedView = (props: FeaturedViewProps) => {
  const { title, subtitle, imageUri, text } = props;
  const imgHeight = hp('23.5%')
  return (
    <FlexBox flexDirection='column' bg={defaultTheme.colors.black}>
      <Box>
        <OrderConfirmationHeader label={''} leftIcon={"back-arrow"} rightIcon={"share"} />
      </Box>
      <FlexBox
        flexDirection={'column'}
        pl={'14px'}
        pr={'14px'}>
        <Box
          mb={hp('1.0%')}>
          <Text
            font={defaultTheme.fontFamily.hnt}
            fontSize={defaultTheme.fontSize.mlg}
            fontWeight={'800'}
            color={defaultTheme.colors.white}>
            {title}
          </Text>
        </Box>
        <Box mb={hp('2.2%')}>
          <Text
            font={defaultTheme.fontFamily.hnt_medium}
            fontSize={defaultTheme.fontSize.m}
            fontWeight={'500'}
            color={defaultTheme.colors.white}>
            {subtitle}
          </Text>
        </Box>
        <Box height={imgHeight} mb={hp('2.2%')}>
          <Image style={{ flex: 1, height: imgHeight, width: undefined, borderRadius: 10 }} source={{ uri: imageUri }} />
        </Box>
        <Text
          font={defaultTheme.fontFamily.hnt_medium}
          fontSize={defaultTheme.fontSize.m}
          fontWeight={'500'}
          color={defaultTheme.colors.white}>
          {text}
        </Text>
      </FlexBox>
    </FlexBox>
  )
}