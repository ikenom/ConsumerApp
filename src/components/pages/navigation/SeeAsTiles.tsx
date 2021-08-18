import { FlexBox, Box } from "../../atoms/layout/Box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { defaultTheme } from "../../../defaultTheme";
import React from "react";
import { Meal } from "../../../models/meal/meal";
import { ScrollView } from "react-native-gesture-handler";
import { TileDisplay } from "../../molecules/common/TileDisplay";
import { OrderConfirmationHeader } from "../order/common/OrderConfirmationHeader";
import { NavigationFooter } from "../../molecules/common/NavigationFooter";
import { HomeStackParamList } from "../../../../App";
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { MealCardData } from "../../atoms/card/Card";

export interface SeeAsTilesProps{
  title: string;
  tiles: MealCardData[];
  navigation?: StackNavigationProp<HomeStackParamList, 'SeeAsTiles'>
}

export const SeeAsTilesNavContainer = (props: StackScreenProps<HomeStackParamList, 'SeeAsTiles'>) => {
  const { navigation, route } = props;
  return (
    <SeeAsTilesView {...route.params} navigation={navigation} />
  )
}

export const SeeAsTilesView = (props: SeeAsTilesProps) => {

  const { title, tiles, navigation } = props;

  const onPressBack = () => {
    navigation?.goBack()
  }

  return (
    <FlexBox flexDirection='column' bg={defaultTheme.colors.black} height={hp('100%')}>
      <Box mt={hp('6.5%')} mb={hp('3%')} pl={'14px'} pr={'14px'}>
        <OrderConfirmationHeader
          label={title}
          icon="chevron-left"
          iconPosition="left"
          onPress={onPressBack} />
      </Box>
      <ScrollView>
        <Box>
          <TileDisplay mealCards={tiles} />
        </Box>
      </ScrollView>
      <Box mb={hp('2.5%')}>
      <NavigationFooter />
      </Box>
    </FlexBox>
  )
}