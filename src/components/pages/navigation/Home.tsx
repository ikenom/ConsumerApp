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
import { HomeStackParamList } from "../../../../App";
import RestaurantStore from "../../../store/restaurantStore";

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

  const restaurantStore = RestaurantStore.getInstance();

  const onPressMeal = (meal: Meal) => {
    const restaurant = restaurantStore.getRestaurantById(meal.restaurantId)
    restaurant ?
      navigation?.push("RestaurantStack", {
        screen: "MealView",
        params: { meal: meal, restaurant: restaurant }
      })
      :
      // If restaurant failed to load by ID, stop from crashing
      // Expected to get null restaurant for mock meals
      Toast.show("Error loading restaurant data meal.", Toast.LONG)
  }

  const onPressSeeMore = (title: string, tiles: EnrichedMeal[]) => {
    navigation?.push('SeeAsTiles', {
      title: title, 
      tiles: tiles
    })
  }

  const navigateToRestaurant = () => {
    // Temporarily hooked this up to Discover on Navigation Footer, for demo purposes
    const restaurants = restaurantStore.getRestaurants().get()
    const restaurant = restaurants[0] // Show first restaurant for demo
    navigation?.push("RestaurantStack", {
      screen: "RestaurantView",
      params: {
        restaurant: restaurant,
        meals: {
          all: restaurant.meals,
          recommendations: restaurant.meals
        }
      }
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
              <CarouselHeader title={"Popular"} onPressSeeMore={() => onPressSeeMore("Popular", meals.popular)} />
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
      <NavigationFooter
        navigateToHome={() => { }}
        navigateToDiscover={navigateToRestaurant} // TEMP
        navigateToProfile={() => { }} />
    </FlexBox>
  )
}