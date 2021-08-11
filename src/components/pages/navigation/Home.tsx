import { FlexBox, Box } from "../../atoms/layout/Box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { defaultTheme } from "../../../defaultTheme";
import React from "react";
import { useState } from 'react';
import { Meal } from "../../../models/meal/meal";
import { Text } from "../../atoms/typography/Text";
import { MaterialCommunityIcon } from "../../atoms/icons/matericalCommunictyIcon";
import { CardCarousel } from "../../atoms/card/CardCarousel";
import { ScrollView } from "react-native-gesture-handler";
import { CarouselHeader } from "../../atoms/card/CarouselHeader";
import { SlideshowCarousel } from "../../atoms/card/SlideshowCarousel";
import { NavigationFooter } from "../../molecules/common/NavigationFooter";
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { HomeStackParamList } from "../../../../App";
import { Restaurant } from "../../../models/restaurant/restaurant";
// TEMP
import { MOCK_RESTAURANT } from "../../../models/restaurant/util";

export const HomeNavContainer = (props: StackScreenProps<HomeStackParamList, "Home">) => {
  const { navigation, route } = props;
    return (
      <HomeView {...route.params} navigation={navigation} />
    )
  }

export interface HomeViewProps {
  locationName: string;
  slideshowImages: Array<any>;
  meals: HomeViewMeals;
  navigation?: StackNavigationProp<HomeStackParamList>;
}

export interface HomeViewMeals {
  new: Meal[];
  popular: Meal[];
  orderAgain: Meal[];
}

export const HomeView = (props: HomeViewProps) => {

  const { locationName, slideshowImages, meals, navigation } = props;
  const [hasNotifications, setHasNotifications] = useState(true);

  // PLACEHOLDER Replace with real backend call
  // Don't want to look up restaurant by name in case there are duplicate names
  const getRestaurantById = (id: string): Restaurant => MOCK_RESTAURANT

  const onPressMeal = (meal: Meal) => {
    const restaurant = getRestaurantById(meal.restaurantId)
    navigation?.push("RestaurantStack", {
      screen: "MealView",
      params: { meal: meal, restaurant: restaurant }
    })
  }

  const onPressSeeMore = (title: string, tiles: Meal[]) => {
    navigation?.push('SeeAsTiles', {
      title: title, 
      tiles: tiles
    })
  }

  const getNoticationIconName = (hasNotifications: boolean) => hasNotifications ? 'bell-alert' : 'bell'

  const onPressNotifications = () => {
    setHasNotifications(!hasNotifications)
  }

  return (
    <FlexBox flexDirection={'column'} bg={defaultTheme.colors.black} width={wp("100%")} height={hp('100%')}>
      <FlexBox flexDirection={'row'} width={wp('99%')} height={hp('14%')} pl={'14px'}>
        <Box flexGrow={1} mt={wp('18%')}>
          <Text>
            <Text color={defaultTheme.colors.white} fontWeight={'400'} fontSize={defaultTheme.fontSize.lg}>Hello </Text>
            <Text color={defaultTheme.colors.blue} fontWeight={'400'} fontSize={defaultTheme.fontSize.lg}>{locationName}</Text>
          </Text>
        </Box>
        <Box mt={wp('18%')} pr={wp('3%')}>
          <MaterialCommunityIcon 
          name={getNoticationIconName(hasNotifications)} 
          onPress={onPressNotifications} 
          size={29} 
          color={defaultTheme.colors.greySeven} />
        </Box>
      </FlexBox>
      <FlexBox flexDirection={'column'} bg={defaultTheme.colors.black} width={wp("100%")} height={hp('77%')} pl={'14px'}>
        <ScrollView>
          <Box>
            <SlideshowCarousel slides={slideshowImages} />
            <FlexBox key='new' flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <CarouselHeader title={"New on FYTR"} onPressSeeMore={() => onPressSeeMore("New on FYTR", meals.new)} />
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} layoutType='tall' meals={meals.new} />
              </Box>
            </FlexBox>
            <FlexBox key='popular' flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <CarouselHeader title={"Popular"} onPressSeeMore={() => onPressSeeMore("Popular", meals.popular)}  />
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} layoutType='tall' meals={meals.popular} />
              </Box>
            </FlexBox>
            <FlexBox key='orderAgain' flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <CarouselHeader title={"Order Again"} onPressSeeMore={() => onPressSeeMore("Order Again", meals.orderAgain)} />
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} layoutType='tall' meals={meals.orderAgain} />
              </Box>
            </FlexBox>
          </Box>
        </ScrollView>
      </FlexBox>
      <NavigationFooter />
    </FlexBox>
  )
}