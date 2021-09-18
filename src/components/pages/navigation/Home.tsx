import { FlexBox, Box } from "../../atoms/layout/Box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { defaultTheme } from "../../../defaultTheme";
import React from "react";
import Toast from 'react-native-simple-toast';
import { useState } from 'react';
import { Meal, EnrichedMeal } from "../../../models/meal/meal";
import { Text } from "../../atoms/typography/Text";
import { MaterialCommunityIcon } from "../../atoms/icons/matericalCommunictyIcon";
import { CardCarousel } from "../../atoms/card/CardCarousel";
import { ScrollView } from "react-native-gesture-handler";
import { CarouselHeader } from "../../atoms/card/CarouselHeader";
import { SlideshowCarousel } from "../../atoms/card/SlideshowCarousel";
import { NavigationFooter } from "../../molecules/common/NavigationFooter";
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import RestaurantStore from "../../../store/restaurantStore";
import { HomeStackParamList, navigateToHome, navigateToRestaurant } from "../../../navigator/HomeStack";

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
  new: EnrichedMeal[];
  popular: EnrichedMeal[];
  orderAgain: EnrichedMeal[];
}

export const HomeView = (props: HomeViewProps) => {

  const { locationName, slideshowImages, meals, navigation } = props;
  const [hasNotifications, setHasNotifications] = useState(true);

  const onPressMeal = (meal: Meal) => {
    const restaurantStore = RestaurantStore.getInstance()
    const restaurant = restaurantStore.getRestaurantById(meal.restaurantId)
    restaurant ?
      navigation?.push("RestaurantStack", {
        screen: "MealView",
        params: { meal: meal, restaurant: restaurant }
      })
      :
      // If restaurant failed to load by ID, stop from crashing
      // Expected to get null restaurant for mock meals
      Toast.show("Error loading restaurant data for meal.", Toast.LONG)
  }

  const navigateToShowAll = (title: string, meals: EnrichedMeal[]) => {
    navigation?.push('SeeAsTiles', {
      title: title, 
      meals: meals
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
              <CarouselHeader title={"New on FYTR"} navigateToShowAll={() => navigateToShowAll("New on FYTR", meals.new)} />
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} meals={meals.new} />
              </Box>
            </FlexBox>
            <FlexBox key='popular' flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <CarouselHeader title={"Popular"} navigateToShowAll={() => navigateToShowAll("Popular", meals.popular)} />
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} meals={meals.popular} />
              </Box>
            </FlexBox>
            <FlexBox key='orderAgain' flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <CarouselHeader title={"Order Again"} navigateToShowAll={() => navigateToShowAll("Order Again", meals.orderAgain)} />
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} meals={meals.orderAgain} />
              </Box>
            </FlexBox>
          </Box>
        </ScrollView>
      </FlexBox>
      <NavigationFooter
        navigateToHome={() => navigateToHome(navigation)}
        navigateToDiscover={() => navigateToRestaurant(navigation)} // TEMP
        navigateToProfile={() => { }} />
    </FlexBox>
  )
}