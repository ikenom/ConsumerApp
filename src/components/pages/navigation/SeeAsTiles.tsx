import { FlexBox, Box } from "../../atoms/layout/Box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { defaultTheme } from "../../../defaultTheme";
import React from "react";
import { Meal } from "../../../models/meal/meal";
import { Text } from "../../atoms/typography/Text";
import { ScrollView } from "react-native-gesture-handler";
import { TileDisplay } from "../../molecules/common/TileDisplay";
import { OrderConfirmationHeader } from "../order/common/OrderConfirmationHeader";
import { MOCK_MEALS_ALL_INFO } from '../../../models/meal/util';
import { NavigationFooter } from "../../molecules/common/NavigationFooter";
import { HomeStackParamList } from "../../../../App";
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

export interface SeeAsTilesProps{
  title: string;
  navigation?: StackNavigationProp<HomeStackParamList, 'SeeAsTiles'>
}

export const SeeAsTilesNavContainer = (props: StackScreenProps<HomeStackParamList, 'SeeAsTiles'>) => {
  const { navigation, route } = props;
  return (
    <SeeAsTilesView {...route.params} navigation={navigation} />
  )
}

export const SeeAsTilesView = (props: SeeAsTilesProps) => {

  const { title, navigation } = props;

  const onPressBack = () => {
    navigation?.goBack()
  }

  return (
    <FlexBox flexDirection='column' bg={defaultTheme.colors.black}>
      <Box mt={hp('6.5%')} mb={hp('3%')} pl={'14px'} pr={'14px'}>
        <OrderConfirmationHeader
          label={title}
          icon="chevron-left"
          iconPosition="left"
          onPress={onPressBack} />
      </Box>
      <ScrollView>
        <Box height={hp('78%')}>
          <TileDisplay meals={MOCK_MEALS_ALL_INFO} />
        </Box>
      </ScrollView>
      <NavigationFooter />
    </FlexBox>
  )
}