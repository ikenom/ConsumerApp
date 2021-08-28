import { FlexBox, Box } from "../../atoms/layout/Box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { defaultTheme } from "../../../defaultTheme";
import React from "react";
import { EnrichedMeal, Meal } from "../../../models/meal/meal";
import { ScrollView } from "react-native-gesture-handler";
import { TileDisplay } from "../../molecules/common/TileDisplay";
import { OrderConfirmationHeader } from "../order/common/OrderConfirmationHeader";
import { NavigationFooter } from "../../molecules/common/NavigationFooter";
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { HomeStackParamList, navigateToRestaurant } from "../../../navigator/HomeStack";

export interface SeeAsTilesProps{
  title: string;
  meals: EnrichedMeal[];
  navigation?: StackNavigationProp<HomeStackParamList, 'SeeAsTiles'>
}

export const SeeAsTilesNavContainer = (props: StackScreenProps<HomeStackParamList, 'SeeAsTiles'>) => {
  const { navigation, route } = props;
  return (
    <SeeAsTilesView {...route.params} navigation={navigation} />
  )
}

export const SeeAsTilesView = (props: SeeAsTilesProps) => {

  const { title, meals, navigation } = props;

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
          <TileDisplay meals={meals} />
        </Box>
      </ScrollView>
      <Box mb={hp('2.5%')}>
        <NavigationFooter
          navigateToHome={onPressBack}
          navigateToDiscover={() => navigateToRestaurant(navigation)}
          navigateToProfile={() => { }} />
      </Box>
    </FlexBox>
  )
}