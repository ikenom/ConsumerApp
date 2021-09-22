import React from 'react';
import { Text } from '../../atoms/typography/Text';
import { FlexBox, Box } from '../layout/Box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image, TouchableOpacity } from 'react-native';
import { BANNER_CARD_DIM, BIG_CARD_DIM, MEAL_CARD_DIM, truncateString } from './util';
import { Meal, EnrichedMeal } from '../../../models/meal/meal';
import { defaultTheme } from '../../../defaultTheme';
import RestaurantStore from '../../../store/restaurantStore';
import { StatBox } from './StatBox';
import { Icons } from './Icons';
import { MaterialCommunityIcon } from '../icons/matericalCommunictyIcon';

export interface MealCardProps {
  meal: EnrichedMeal;
  hideDistance?: boolean;
  onPress: (meal: Meal) => void;
}

export const MealCard = (props: MealCardProps) => {

  const { meal, onPress, hideDistance } = props;
  const { image,
    name,
    price,
    description,
    restaurantId,
    restaurantName,
    isFlaggedIngredient,
    containsExcludedIngredients } = meal;

  const dimensions = MEAL_CARD_DIM

  const onNavigate = () => {
    onPress(meal)
  };

  const getRestaurantDistance = (restaurantId: string) => {
    const restaurantStore = RestaurantStore.getInstance()
    return restaurantStore.getRestaurantById(restaurantId)?.distance
  }

  const distance = getRestaurantDistance(restaurantId)

  return (
    <FlexBox
      backgroundColor={defaultTheme.colors.blackTwo}
      width={dimensions.width}
      flexDirection={'column'}
      overflow={'hidden'}
      borderRadius={'10px'}>
      <TouchableOpacity activeOpacity={.5} onPress={onNavigate}>
        <Box
          height={dimensions.height}
          width={dimensions.width}
          overflow={'hidden'} >
          <Image style={{ flex: 1, height: undefined, width: dimensions.width }} source={{ uri: image }} />
        </Box>
        <FlexBox
          overflow={'hidden'}
          padding={1}
          flexDirection={'column'}
          justifyContent={'space-evenly'}
          pl={wp('2.0%')}
          pr={wp('2.0%')}
          pb={hp('1.3%')}>
          <Text fontWeight={'600'} fontSize={'16px'} color={'#FFFFFF'} mb={hp('0.75%')}>
            {name}
          </Text>
          {restaurantName &&
            (<Text
              height={hp('2%')}
              fontWeight={'500'}
              fontSize={'15px'}
              color={'#B7B7B7'}
              mb={hp('0.9%')}>
              {restaurantName}
            </Text>)}
          <FlexBox
            width={wp('24%')}
            br={'25px'}
            mt={'2px'}
            alignContent={'center'}
            flexDirection={'row'}
            mb={hp('1.2%')}>
            <StatBox string={`$${price}`} />
            {!hideDistance && distance && (<StatBox string={`${distance} mi`} />)}
          </FlexBox>
          <Icons isFlagged={isFlaggedIngredient} containsExcluded={containsExcludedIngredients} />
        </FlexBox>
      </TouchableOpacity>
    </FlexBox>
  );
};

export const BigCard = (props: MealCardProps) => {

  const { meal, onPress, hideDistance } = props;
  const { image,
    name,
    price,
    description,
    restaurantId,
    restaurantName,
    isFlaggedIngredient,
    containsExcludedIngredients } = meal;

  const dimensions = BIG_CARD_DIM

  const onNavigate = () => {
    onPress(meal)
  };

  const getRestaurantDistance = (restaurantId: string) => {
    const restaurantStore = RestaurantStore.getInstance()
    return restaurantStore.getRestaurantById(restaurantId)?.distance
  }

  const distance = getRestaurantDistance(restaurantId)

  return (
    <FlexBox
      backgroundColor={defaultTheme.colors.blackTwo}
      width={dimensions.width}
      flexDirection={'column'}
      overflow={'hidden'}
      borderRadius={'10px'}>
      <TouchableOpacity activeOpacity={.5} onPress={onNavigate}>
        <Box
          height={dimensions.height}
          width={dimensions.width}
          overflow={'hidden'}
          pb={hp('2%')} >
          <Image style={{ flex: 1, height: undefined, width: dimensions.width }} source={{ uri: image }} />
        </Box>
        <FlexBox
          overflow={'hidden'}
          padding={1}
          flexDirection={'column'}
          justifyContent={'space-evenly'}
          pl={wp('4.1%')}
          pr={wp('4.1%')}
          pb={hp('1.3%')}>
          <Box pb={hp('0.8%')}>
            <Text fontWeight={'700'} fontSize={'17px'} color={'#FFFFFF'} mb={hp('0.75%')}>
              {name}
            </Text>
          </Box>
          <FlexBox
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            mb={hp('1.3%')}>
            <FlexBox
              width={wp('24%')}
              br={'25px'}
              alignContent={'center'}
              flexDirection={'row'}>
              <StatBox string={`$${price}`} />
              {!hideDistance && distance && (<StatBox string={`${distance} mi`} />)}
            </FlexBox>
            <Icons isFlagged={isFlaggedIngredient} containsExcluded={containsExcludedIngredients} />
          </FlexBox>
          <FlexBox
            flexDirection={'row'}
            pt={hp('1.5%')}
            borderTopWidth={'1px'}
            borderColor={defaultTheme.colors.greyNine}
            alignItems={'center'}
            justifyContent={'space-between'}>
            {restaurantName &&
              (<Text
                  height={hp('2%')}
                  fontWeight={'600'}
                  fontSize={'17px'}
                  color={defaultTheme.colors.greyTen}>
                  {truncateString(restaurantName, dimensions.truncateStrTo)}
                </Text>)}
            <MaterialCommunityIcon
              name={'silverware'}
              color={defaultTheme.colors.greyTen}
              size={22} />
          </FlexBox>
        </FlexBox>
      </TouchableOpacity>
    </FlexBox>
  );
};

export const BannerCard = (props: MealCardProps) => {
  const { meal, onPress } = props;
  const { image,
    name,
    price,
    description,
    restaurantId,
    restaurantName,
    isFlaggedIngredient,
    containsExcludedIngredients } = meal;

  const onNavigate = () => {
    onPress(meal)
  };

  const dimensions = BANNER_CARD_DIM

  return (
    <FlexBox
      backgroundColor={defaultTheme.colors.blackTwo}
      width={wp('95%')}
      flexDirection={'row'}
      overflow={'hidden'}
      borderRadius={'10px'}>
      <TouchableOpacity activeOpacity={.5} onPress={onNavigate}>
        <FlexBox flexDirection={'row'}>
          <Box
            height={'auto'}
            width={wp('35%')}
            overflow={'hidden'} >
            <Image style={{ flex: 1, height: dimensions.height, width: 'auto' }} source={{ uri: image }} />
          </Box>
          <FlexBox
            overflow={'hidden'}
            padding={1}
            flexDirection={'column'}
            justifyContent={'space-evenly'}
            pl={wp('2.0%')}
            pr={wp('2.0%')}
            pb={hp('1.3%')}>
            <Text fontWeight={'600'} fontSize={'16px'} color={'#FFFFFF'} mb={hp('0.75%')}>
              {truncateString(name, dimensions.truncateStrTo)}
            </Text>
            {description &&
              (<Text
                height={hp('2%')}
                fontWeight={'500'}
                fontSize={'15px'}
                color={'#B7B7B7'}
                mb={hp('0.9%')}>
                {truncateString(description, dimensions.truncateStrTo)}
              </Text>)}
            <FlexBox flexDirection={'row'} >
              <FlexBox
                width={wp('24%')}
                br={'25px'}
                mt={'2px'}
                alignContent={'center'}
                flexDirection={'row'}
                mb={hp('1.2%')}>
                <StatBox string={`$${price}`} />
              </FlexBox>
              <Icons isFlagged={isFlaggedIngredient} containsExcluded={containsExcludedIngredients} />
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </TouchableOpacity>
    </FlexBox>
  );
}

MealCard.displayName = 'Meal Card';
