import { Restaurant } from "../../../models/restaurant/restaurant";
import { FlexBox, Box } from "../../atoms/layout/Box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { defaultTheme } from "../../../defaultTheme";
import React from "react";
import {Image} from 'react-native';
import { Meal } from "../../../models/meal/meal";
import { Text } from "../../atoms/typography/Text";
import { Ionicon } from "../../atoms/icons/Ionicons";
import { MaterialCommunityIcon } from "../../atoms/icons/matericalCommunictyIcon";
import { CardCarousel } from "../../atoms/card/CardCarousel";
import { Button } from "react-native-elements/dist/buttons/Button";
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { RestaurantParamList } from "../../../../App";
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
    navigation?.push('MealView', {meal: meal, restaurant: restaurant});
  }
  return (
    <FlexBox flexDirection={'column'} bg={defaultTheme.colors.black} width={wp("100%")} height={hp('100%')}>
      <FlexBox flexDirection={'row'} width={wp('99%')} height={hp('14%')} pl={'14px'}>
        <Box flexGrow={1} mt={'70px'} pb={'15px'}>
          <Text>
            <Text color={defaultTheme.colors.white} fontWeight={'400'} fontSize={defaultTheme.fontSize.lg}>Hello </Text>
            <Text color={defaultTheme.colors.blue} fontWeight={'400'} fontSize={defaultTheme.fontSize.lg}>Harlem</Text>
          </Text>
        </Box>
        <Box mt={'70px'} align='center' pr={'10px'} pt={'2px'}>
          <MaterialCommunityIcon name={'bell'} size={29} color={defaultTheme.colors.greySeven} />
          {/* Use bell-badge for notification pending*/}
        </Box>
      </FlexBox>
      <FlexBox flexDirection={'column'} bg={defaultTheme.colors.black} width={wp("100%")} height={hp('76%')} pl={'14px'}>
        <ScrollView>
          <Box>
            <Box width={wp('95%')} height={hp('23%')} alignSelf='center' pr={'14px'}>
              <Image style={{ flex: 1, height: '100%', width: '100%', borderRadius: 5 }} source={restaurant.image} />
            </Box>
            <FlexBox flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <FlexBox flexDirection={'row'} pr='14px' alignItems='center'>
                <Box flexGrow={1}>
                  <Text color={defaultTheme.colors.white} fontWeight={'400'} fontSize={defaultTheme.fontSize.lg}>
                    New on FYTR
                  </Text>
                </Box>
                <Box>
                  <MaterialCommunityIcon name={'dots-horizontal'} size={27} color={defaultTheme.colors.blue} />
                </Box>
              </FlexBox>
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} layoutType='vertical' meals={meals.all} />
              </Box>
            </FlexBox>
            <FlexBox flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <Text color={defaultTheme.colors.white} fontWeight={'400'} fontSize={defaultTheme.fontSize.lg}>
                Popular
            </Text>
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} layoutType='vertical' meals={meals.all} />
              </Box>
            </FlexBox>
            <FlexBox flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <Text color={defaultTheme.colors.white} fontWeight={'400'} fontSize={defaultTheme.fontSize.lg}>
                Order Again
            </Text>
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} layoutType='vertical' meals={meals.all} />
              </Box>
            </FlexBox>
          </Box>
        </ScrollView>
      </FlexBox>
      <FlexBox flexDirection={'row'} pt={'13px'} justifyContent='center'>
        <Box flexGrow={1} alignItems='center'>
          <MaterialCommunityIcon name={'home'} size={27} color={defaultTheme.colors.blue} />
          <Text color={defaultTheme.colors.blue} fontSize={defaultTheme.fontSize.xsm}>Home</Text>
        </Box>
        <Box flexGrow={1} alignItems='center' pl={'33px'} pr={'33px'}>
          <MaterialCommunityIcon name={'filter-variant'} size={27} color={defaultTheme.colors.greyEight} />
          <Text color={defaultTheme.colors.greyEight} fontSize={defaultTheme.fontSize.xsm}>Discover</Text>
        </Box>
        <Box flexGrow={1} alignItems='center'>
          <MaterialCommunityIcon name={'account-circle'} size={27} color={defaultTheme.colors.greyEight} />
          <Text color={defaultTheme.colors.greyEight} fontSize={defaultTheme.fontSize.xsm}>Profile</Text>
        </Box>
      </FlexBox>
    </FlexBox>
  )
}