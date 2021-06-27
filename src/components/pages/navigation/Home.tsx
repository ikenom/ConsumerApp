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
import Carousel from 'react-native-snap-carousel';
import Pagination from 'react-native-snap-carousel';
import { CardCarousel } from "../../atoms/card/CardCarousel";
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RestaurantParamList } from "../../../../App";
import { ScrollView } from "react-native-gesture-handler";
import { CarouselHeader } from "../../atoms/card/CarouselHeader";

// TODO Create Home version
export interface HomeViewProps {
  locationName: String;
  newsTiles: Array<any>;
  meals: HomeViewMeals;
  navigation?: StackNavigationProp<RestaurantParamList, 'HomeView'>
}

// TODO Create Home version
export interface HomeViewMeals {
  new: Meal[];
  popular: Meal[];
  orderAgain: Meal[];
}

// TODO Create HomeNavigatorContainer
export const HomeNavigatorContainer = (props: StackScreenProps<RestaurantParamList, 'HomeView'>) => {
const { navigation, route } = props;
  return (
    <HomeView {...route.params} navigation={navigation} />
  )
}

/* What inputs needed?
Whatever Harlem represents (Name? Place?)
Photos and text for top carousel "Where to eat in NYC"
New on FYTR Meals
Popular Meals
Order Again Meals

Links to:
Notifications
Discover
Profile
Whatever those dot thingies do

Link to Home via back button on Restaurant view
*/

export const HomeView = (props: HomeViewProps) => {

  const { locationName, newsTiles, meals, navigation } = props;

  const onPressMeal = (meal: Meal) => {
    // TODO Figure out where to get restaurant for this to work
    // navigation?.push('MealView', {meal: meal, restaurant: restaurant});
  }

  const TileWrapper = ({item, index}) => {
    return(
      <Image style={{ flex: 1, height: '100%', width: '100%', borderRadius: 8 }} source={item} />
    )
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
              <Carousel 
                layout={'stack'} 
                firstItem={1} 
                vertical={false} 
                data={newsTiles} 
                renderItem={TileWrapper} 
                sliderWidth={wp('94%')} 
                itemWidth={wp('94%')} 
                enableMomentum={true} 
                activeSlideOffset={0} 
                windowSize={10} />
              {/* <Pagination dotsLength=4 activeDotsIndex=1 /> */}
            </Box>
            <FlexBox flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <CarouselHeader title={"New on FYTR"}/>
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} layoutType='vertical' meals={meals.new} />
              </Box>
            </FlexBox>
            <FlexBox flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <CarouselHeader title={"Popular"}/>
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} layoutType='vertical' meals={meals.popular} />
              </Box>
            </FlexBox>
            <FlexBox flexDirection={'column'} alignContent={'center'} pt={hp('1.5%')}>
              <CarouselHeader title={"Order Again"}/>
              <Box mt={hp('1.5%')}>
                <CardCarousel onPress={onPressMeal} layoutType='vertical' meals={meals.orderAgain} />
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