import { FlexBox, Box } from "../../atoms/layout/Box";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { defaultTheme } from "../../../defaultTheme";
import React from "react";
import { Meal } from "../../../models/meal/meal";
import { Text } from "../../atoms/typography/Text";
import { MaterialCommunityIcon } from "../../atoms/icons/matericalCommunictyIcon";
import { CardCarousel } from "../../atoms/card/CardCarousel";
import { ScrollView } from "react-native-gesture-handler";
import { CarouselHeader } from "../../atoms/card/CarouselHeader";
import { SlideshowCarousel } from "../../atoms/card/SlideshowCarousel";
import { NavigationFooter } from "../../molecules/common/NavigationFooter";

export interface HomeViewProps {
  locationName: string;
  newsTiles: Array<any>;
  meals: HomeViewMeals;
  navigation?: any; // TODO hook this boi up
}

export interface HomeViewMeals {
  new: Meal[];
  popular: Meal[];
  orderAgain: Meal[];
}

export const HomeView = (props: HomeViewProps) => {

  const { locationName, newsTiles, meals, navigation } = props;

  const onPressMeal = (meal: Meal) => {
    // TODO Figure out where to get restaurant for this to work
    // navigation?.push('MealView', {meal: meal, restaurant: restaurant});
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
          <MaterialCommunityIcon name={'bell'} size={29} color={defaultTheme.colors.greySeven} />
          {/* Use bell-badge for notification pending*/}
        </Box>
      </FlexBox>
      <FlexBox flexDirection={'column'} bg={defaultTheme.colors.black} width={wp("100%")} height={hp('77%')} pl={'14px'}>
        <ScrollView>
          <Box>
            <SlideshowCarousel slides={newsTiles} />
            <FlexBox flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <CarouselHeader title={"New on FYTR"} />
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} layoutType='tall' meals={meals.new} />
              </Box>
            </FlexBox>
            <FlexBox flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <CarouselHeader title={"Popular"} />
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} layoutType='tall' meals={meals.popular} />
              </Box>
            </FlexBox>
            <FlexBox flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <CarouselHeader title={"Order Again"} />
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