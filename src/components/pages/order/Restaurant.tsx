import { Restaurant } from "../../../models/restaurant/restaurant";
import { FlexBox, Box } from "../../atoms/layout/Box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { defaultTheme } from "../../../defaultTheme";
import React from "react";
import {Image} from 'react-native';
import { EnrichedMeal, Meal } from "../../../models/meal/meal";
import { Text } from "../../atoms/typography/Text";
import { Ionicon } from "../../atoms/icons/Ionicons";
import { MaterialCommunityIcon } from "../../atoms/icons/matericalCommunictyIcon";
import { Button } from "react-native-elements/dist/buttons/Button";
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { RestaurantParamList } from "../../../navigator/RestaurantStack";
import { BannerCard } from "../../atoms/card/Card";
import { ScrollView } from "react-native-gesture-handler";


export interface RestaurantViewProps {
  restaurant: Restaurant;
  meals: RestaurantViewMeals;
  navigation?: StackNavigationProp<RestaurantParamList, 'RestaurantView'>
}

export interface RestaurantViewMeals {
  all: Meal[];
  recommendations: Meal[];
}

export const RestaurantNavigatorContainer = (props: StackScreenProps<RestaurantParamList, 'RestaurantView'>) => {
const { navigation, route } = props;
  return (
    <RestaurantView {...route.params} navigation={navigation} />
  )
}

export const RestaurantView = (props: RestaurantViewProps) => {

  const { restaurant, meals, navigation } = props;

  const { businessHours } = restaurant;


  const onPressMeal = (meal: Meal) => {
    navigation?.push('MealView', { meal: meal, restaurant: restaurant });
  }

  const onPressBack = () => {
    navigation?.goBack()
  }

  const getMealItemsTsx = (meals: Meal[]) => {
    return meals.map(
      (m) => (
        <Box
          mb={hp('1.5%')}>
          <BannerCard meal={m} onPress={onPressMeal} hideDistance={true} />
        </Box>
      )
    )
  }

  return (
    <ScrollView>
      <FlexBox flexDirection={'column'} bg={defaultTheme.colors.black} width={wp("100%")} height={hp('100%')}>
        <Box>
          <Box width={wp('99%')} height={hp('23%')} overflow={'hidden'} borderRadius={'5px'}>
            <Image style={{ flex: 1, height: undefined, width: undefined }} source={restaurant.image} />
          </Box>
          <FlexBox bottom={hp('19%')} right={wp('45%')}>
            <Button onPress={onPressBack} icon={<Ionicon name="chevron-back-circle-sharp" size={32} color={defaultTheme.colors.greyOne} style={{ borderColor: defaultTheme.colors.black }} />} />
          </FlexBox>
        </Box>
        <Box pl={'16px'} bottom={hp('5px')}>
          <Box mb={`${hp('1.1%')}px`} width={wp('72%')}>
            <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.xlg} color={defaultTheme.colors.white}>
              {restaurant.name}
            </Text>
          </Box>
          <Box mb={hp('1.5%')} fontSize={defaultTheme.fontSize.m} width={wp('72%')}>
            <Text color={defaultTheme.colors.white}>
              {restaurant.description}
            </Text>
          </Box>
          <FlexBox flexDirection={'row'} alignContent={'center'} mb={hp('1.5%')}>
            <MaterialCommunityIcon name={'clock-time-three-outline'} size={23} color={defaultTheme.colors.greyTwo} />
            <Box ml={wp('2%')} pt={'2px'} fontSize={defaultTheme.fontSize.m}>
              <Text color={defaultTheme.colors.white}>
                {`${businessHours.openingTime} - ${businessHours.closingTime}`}
              </Text>
            </Box>
          </FlexBox>
          <FlexBox flexDirection={'row'} alignContent={'center'}>
            <Box pt={hp('0.4%')}>
              <Ionicon name={'md-location-sharp'} size={25} color={defaultTheme.colors.greyTwo} />
            </Box>
            <FlexBox ml={wp('2%')} fontSize={defaultTheme.fontSize.m} flexDirection={'column'}>
              <Text color={defaultTheme.colors.blue} style={{ textDecorationLine: 'underline' }}>
                {`${restaurant.location.street}`}
              </Text>
              <Text color={defaultTheme.colors.blue} style={{ textDecorationLine: 'underline' }}>
                {`${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zipCode}`}
              </Text>
            </FlexBox>
          </FlexBox>
          <FlexBox flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
            <Text color={defaultTheme.colors.white} fontWeight={'500'} fontSize={defaultTheme.fontSize.lg}>
              For You
            </Text>
            <Box mt={hp('1.5%')}>
              {getMealItemsTsx(meals.recommendations)}
            </Box>
          </FlexBox>
          <FlexBox flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
            <Text color={defaultTheme.colors.white} fontWeight={'500'} fontSize={defaultTheme.fontSize.lg}>
              All
            </Text>
            <Box mt={hp('1.5%')}>
              {getMealItemsTsx(meals.all)}
            </Box>
          </FlexBox>
        </Box>
      </FlexBox>
    </ScrollView>
  )
}