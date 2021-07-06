import { defaultTheme } from "../../../defaultTheme";
import { Meal, Nutrition } from "../../../models/meal/meal";
import { Restaurant } from "../../../models/restaurant/restaurant";
import { Box, FlexBox } from "../../atoms/layout/Box";
import { LogBox } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from '../../atoms/typography/Text';
import React, { useState } from "react";
import { Image, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { Button } from "react-native-elements/dist/buttons/Button";
import {
  useCollapsible,
  AnimatedSection,
} from 'reanimated-collapsible-helpers';
import { Ionicon } from "../../atoms/icons/Ionicons";
import { MaterialCommunityIcon } from "../../atoms/icons/matericalCommunictyIcon";
import styled from "styled-components";
import { getFatsInCalories, getProteinInCalories } from "../../../models/meal/util";
import { Easing } from "react-native-reanimated";
import { isOpen, MOCK_DISTANCE } from "../../../models/restaurant/util";
import { RestaurantInfoModal } from "../../atoms/modals/RestaurantInfoModal";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RestaurantParamList } from "../../../../App";

LogBox.ignoreLogs(['Easing', 'expected']);

const StyledDivider = styled(Divider)`
  backgroundColor: ${defaultTheme.colors.greyFive};
  height: 2px;
  margin-bottom: ${hp("2%")}px
`;

export const MealNavigatorContainer = (props: StackScreenProps<RestaurantParamList, 'MealView'>) => {
  const { navigation, route } = props;
  return (
    <MealOrderView {...route.params} navigation={navigation} />
  )
}
export interface MealViewProps {
  meal: Meal;
  restaurant: Restaurant;
  navigation?: StackNavigationProp<RestaurantParamList, 'MealView'>
}

export const MealOrderView = (props: MealViewProps) => {
  const { meal, restaurant, navigation } = props;

  const [isModalOpen, setModalVisibility] = useState(false);

  const toggleModal = () => {
    setModalVisibility(!isModalOpen)
  }

  const onBackPressed = () => {
    navigation?.pop();
  }

  const onOrderButtonPressed = () => {
    navigation?.push('CartView', {restaurant, meal})
  }

  const onNavigateToRestaurant = () => {
    // Get meals of restaurant from store
    // navigate
  }

  return (
    <FlexBox flexDirection={'column'} bg={defaultTheme.colors.black} width={wp("100%")} height={hp('100%')}>
      <Box width= {wp('99%')} height={hp('26%')} mb={hp("3%")}>
        <Box width= {wp('99%')} height={hp('26%')} borderRadius={'5px'}>
          <Image style={{flex: 1, height: undefined, width: undefined}} source={{uri: meal.image}} />
        </Box>
        <Box bottom={hp('26%')} right={wp('43%')} pt={hp("2.3%")}>
          <Button onPress={onBackPressed} icon={<Ionicon name="chevron-back-circle-sharp" size={33} color={defaultTheme.colors.greyTwo} style={{borderColor: defaultTheme.colors.black}}/>}/>
        </Box>
        <FlexBox top={-hp('12.9%')} pl={"20px"} pb={"10px"} bg={'#000000'} height={wp('15%')} padding={1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <Box mt={hp('1.1%')}>
            <Text fontWeight={'500'} fontSize={'28px'} color={'#FFFFFF'} >
            {meal.name}
            </Text>
          </Box>
        </FlexBox>
      </Box>
      <Box pl={wp('5%')} pr={wp("5%")} height={hp('43%')}>
        <Box overflow={'scroll'} maxHeight={hp('9%')} mb={hp("5%")}>
          <Text fontWeight={'400'} fontSize={'16px'} color={'#FFFFFF'}>
          {meal.description}
          </Text>
        </Box>
        <StyledDivider />
          <RestaurantInfo restaurant={restaurant} toggleModal={toggleModal}/>
        <StyledDivider />
        <FlexBox width={wp("93%")}>
            <NutritionDropDown nutrition={meal.nutrition} />
        </FlexBox>
      </Box>
      <FlexBox pl={wp('5%')} pr={wp("5%")} width={wp('100%')} position={'absolute'} bottom={hp('4%')}>
        <Button 
          title="Order" 
          buttonStyle={{
            backgroundColor: defaultTheme.colors.blue, 
            height: hp('5.9%'), 
            justifyContent: 'flex-end',
            borderRadius: 10
          }}
          titleStyle={{marginRight: wp('48%'), fontSize: 18, fontWeight: '700', marginLeft: wp('5%')}}
          iconContainerStyle={{marginRight: wp('10%'), paddingLeft: wp('5%')}}
          iconRight={true}
          icon={<Text fontWeight={'700'} fontSize={'18px'} color={'#FFFFFF'}>{`$${meal.price}`}</Text>}
          onPress={onOrderButtonPressed}
        />
      </FlexBox>
      {isModalOpen ? <RestaurantInfoModal restaurant={restaurant} isVisible={isModalOpen} onClose={toggleModal}/> : <Box></Box>}
    </FlexBox >
  )
}

interface RestaurantInfoProps {
  restaurant: Restaurant;
  toggleModal: () => void
}

const RestaurantInfo = (props: RestaurantInfoProps) => {
  const { restaurant, toggleModal } = props;


  return(
    <TouchableOpacity activeOpacity={.5} onPress={toggleModal}>
      <FlexBox flexDirection={'row'} mb={hp("2%")} justifyContent={"space-between"}>
        <FlexBox flexDirection={'column'} mb={hp("1.1%")}>
          <Text fontWeight={'700'} fontSize={'18px'} color={'#FFFFFF'} mb={hp('1.3%')}>
          {restaurant.name}
          </Text>
          <FlexBox flexDirection={'row'}>
            <MaterialCommunityIcon name={'clock-time-three-outline'} size={23} color={defaultTheme.colors.greyTwo}/>
            <Text  mt={'1px'} ml={wp('2.3%')} mr={wp('5.8%')} fontWeight={'400'} fontSize={defaultTheme.fontSize.m} color={'#FFFFFF'}>{isOpen(restaurant.businessHours) ? 'Open' : 'Closed'}</Text>
            <Ionicon name={'md-location-sharp'} size={25} color={defaultTheme.colors.greyTwo}/>
            <Text  mt={'1px'} ml={wp('2%')} mr={wp('5.8%')} fontWeight={'400'} fontSize={defaultTheme.fontSize.m} color={'#FFFFFF'}>{`${MOCK_DISTANCE} mi`}</Text>
          </FlexBox>
        </FlexBox>
        <Button onPress={toggleModal} icon={<MaterialCommunityIcon name={"chevron-right"} size={25} color={"#FFFFFF"}/>} />
      </FlexBox>
    </TouchableOpacity>
  )
}

interface NutritionDropdownProps {
  nutrition: Omit<Nutrition, "micros">
}

const NutritionDropDown = (props: NutritionDropdownProps) => {
  const { nutrition: {calories, macros} } = props;

  const { animatedHeight, onPress, onLayout, state: collapseState } = useCollapsible({easing: Easing.exp, duration: 100});
  return (
    <TouchableOpacity activeOpacity={.5} onPress={onPress}>
      <FlexBox height={hp('6.2%')} flexDirection={'row'} justifyContent={"space-between"}>
        <Box mt={hp("2%")}>
          <Text fontWeight={'700'} fontSize={defaultTheme.fontSize.m} color={'#FFFFFF'}>Nutritional Breakdown</Text>
        </Box>
        <Button onPress={onPress} icon={<MaterialCommunityIcon name={collapseState === 'collapsed' ? "chevron-down-box" : "chevron-up-box"} size={35} color={"#1D2941"} />}/>
      </FlexBox>
      <AnimatedSection
      animatedHeight={animatedHeight}
      onLayout={onLayout}
      state={collapseState}>
        <FlexBox  pr={'10px'} pt={hp('.3%')} flexDirection={'column'}>
          <FlexBox flexDirection={'row'} justifyContent={"space-between"} mb={hp("2%")}>
            <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.m} color={'#FFFFFF'}>Calories</Text>
            <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.m} color={'#FFFFFF'}>{calories}</Text>
          </FlexBox>
          <StyledDivider />
          <NutritionItem label={"Protein"} percentage={((getProteinInCalories(macros.proteinInGrams) / calories) * 100).toPrecision(2)} grams={macros.proteinInGrams}/>
          <StyledDivider />
          <NutritionItem label={"Fat"} percentage={((getFatsInCalories(macros.fatsInGrams) / calories) * 100).toPrecision(2)} grams={macros.fatsInGrams}/>
          <StyledDivider />
          <NutritionItem label={"Carbs"} percentage={((getFatsInCalories(macros.carbsInGrams) / calories) * 100).toPrecision(2)} grams={macros.carbsInGrams}/>
          <StyledDivider />
        </FlexBox>
      </AnimatedSection>
    </TouchableOpacity>
  );
};

interface NutritionItemProps {
  label: string;
  percentage: string;
  grams: number;
}

const NutritionItem = (props: NutritionItemProps) => {
  const { label, percentage, grams } = props;
  return(
    <FlexBox flexDirection={'row'} justifyContent={"space-between"} mb={hp("2%")}>
      <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.m} color={'#FFFFFF'}>{`${label}   ${percentage}%`}</Text>
      <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.m} color={'#FFFFFF'}>{`${grams}g`}</Text>
    </FlexBox>
  )
}
