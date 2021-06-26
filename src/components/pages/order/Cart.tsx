import React, { useState } from "react";
import styled from "styled-components";
import { Image } from "react-native";
import { Divider, Input } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as getHeightInPixels,
} from 'react-native-responsive-screen';
import { Button } from "react-native-elements/dist/buttons/Button";
import { defaultTheme } from "../../../defaultTheme";
import { Box, FlexBox, FlexItem } from "../../atoms/layout/Box";
import { Text } from "../../atoms/typography/Text";
import { MaterialCommunityIcon } from "../../atoms/icons/matericalCommunictyIcon";
import Visa from '../../../../assets/svg/Visa.svg';
import { Restaurant } from "../../../models/restaurant/restaurant";
import { Meal } from "../../../models/meal/meal";
import { LocationDisplay } from "../../molecules/common/LocationDisplay"
import { TouchableOpacity } from "react-native-gesture-handler";
import { OrderConfirmationHeader } from "./common/OrderConfirmationHeader";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RestaurantParamList } from "../../../../App";
import { createMockOrderWithItems } from "../../../models/order/util";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FulfillmentDivider = styled(Divider)<{isSelected: boolean}>`
  backgroundColor: ${({isSelected}) => (isSelected ? defaultTheme.colors.blueOne : defaultTheme.colors.greySix)};
  height: 2px;
`

const SmallDivider = styled(Divider)`
  backgroundColor: ${defaultTheme.colors.greySix};
  height: 1px;
`;

export const OrderConfirmationCartContainer = (props: StackScreenProps<RestaurantParamList, 'CartView'>) => {
  const { navigation, route} = props;
  return(
    <OrderConfirmationCart {...route.params} navigation={navigation}/>
  )
}

export interface OrderConfirmationCartProps {
  restaurant: Restaurant;
  meal: Meal;
  navigation?: StackNavigationProp<RestaurantParamList, 'CartView'>
}

const fulfillment = ["Pickup", "Delivery"] as const;
type Fulfillment = typeof fulfillment[number]

export const OrderConfirmationCart = (props: OrderConfirmationCartProps) => {

  const insets = useSafeAreaInsets();
  
  const { restaurant, meal, navigation } = props;
  const fees = (Number.parseFloat(meal.price) * .07);
  const total = fees + Number.parseFloat(meal.price)

  const [fulfillmentType, setFulfillmentType] = useState<Fulfillment>("Pickup");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const onPressFulfillment = (selection: Fulfillment) => {
    if(selection !== "Delivery") {
      setFulfillmentType(selection);
    }
  }

  const onBackPressed = () => {
    navigation?.pop();
  }

  const onConfirmOrder = () => {
    const mockOrder = createMockOrderWithItems([meal]);
    console.log(mockOrder)
    navigation?.push('ConfirmationView', {restaurant, order: mockOrder})
  }

  return(
    <FlexBox flexDirection={'column'} pt={insets.top}>
      <Box pl={'16px'} pr={'16px'} mb={getHeightInPixels("3%")}>
        <OrderConfirmationHeader label={"Your Cart"} icon={"chevron-left"} onPress={onBackPressed} iconPosition={'left'}/>
      </Box>
      <Box width= {wp('100%')} height={getHeightInPixels('17%')} borderRadius={'5px'} mb={getHeightInPixels("3.2%")}>
          <Image style={{flex: 1, height: undefined, width: undefined}} source={meal.image} />
      </Box>
      <FlexBox pl={'16px'} pr={'16px'} flexDirection={'column'} mb={getHeightInPixels("3%")}>
        <Text fontWeight={'700'} fontSize={'18px'} color={defaultTheme.colors.white} mb={getHeightInPixels('1.3%')}>
          {restaurant.name}
        </Text>
        <LocationDisplay location={restaurant.location} highlighted={false}/>
      </FlexBox>
      <Box width= {wp('100%')} mb={`${getHeightInPixels("3.0%")}`}> 
        <FulfillmentSelection selectedFulfillment={fulfillmentType} onPress={onPressFulfillment}/>
      </Box>
      <FlexBox pl={'16px'} pr={'16px'} flexDirection={'column'}>
        <Text fontWeight={'400'} fontSize={'18px'} color={defaultTheme.colors.white} mb={getHeightInPixels('1.1%')}> Items </Text>
        <FlexBox flexDirection={'row'} justifyContent={"space-between"} mb={getHeightInPixels("2%")}>
          <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.sm} color={defaultTheme.colors.greySix}>{`1. ${meal.name}`}</Text>
          <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.sm} color={defaultTheme.colors.greySix}>{`$${meal.price}`}</Text>
        </FlexBox>
      </FlexBox>
      <Box pl={'5px'} pr={'5px'} mb={getHeightInPixels("1.1%")}>
        <Input
          placeholder="Additional Note"
          style={{color: defaultTheme.colors.greySix, fontSize: 14, fontWeight: '400'}}
          onChangeText={value => setAdditionalNotes(value)}
        />
      </Box>
      <FlexBox pl={'16px'} pr={'16px'} flexDirection={'column'}>
        <PaymentMethod />
        <FlexBox flexDirection={'row'} justifyContent={"space-between"}>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white} mb={getHeightInPixels('1.1%')}>SubTotal </Text>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white} mb={getHeightInPixels('1.1%')}>{`$${meal.price}`}</Text>
        </FlexBox>
        <FlexBox flexDirection={'row'} justifyContent={"space-between"} mb={getHeightInPixels("1.1%")}>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.sm} color={defaultTheme.colors.greySix}>{"Fees & Taxes"}</Text>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.sm} color={defaultTheme.colors.greySix}>{`$${fees.toFixed(2)}`}</Text>
        </FlexBox>
        <SmallDivider />
        <FlexBox flexDirection={'row'} justifyContent={"space-between"} mt={getHeightInPixels('1.5%')} mb={getHeightInPixels("1.5%")}>
          <Text fontWeight={'600'} fontSize={'18px'} color={defaultTheme.colors.white}>{"Total"}</Text>
          <Text fontWeight={'600'} fontSize={'18px'} color={defaultTheme.colors.white}>{`$${total.toFixed(2)}`}</Text>
        </FlexBox>
        <SmallDivider />
      </FlexBox>
      <FlexBox pl={'5%'} pr={"5%"} width={wp('100%')} position={'absolute'} bottom={-getHeightInPixels('8%')}>
        <Button 
          title="Confirm Order" 
          buttonStyle={{
            backgroundColor: defaultTheme.colors.blue, 
            height: getHeightInPixels('5.9%'), 
            borderRadius: 10
          }}
          titleStyle={{marginRight: wp('37%'), fontSize: 18, fontWeight: '700'}}
          iconContainerStyle={{marginRight: wp('10%'), paddingLeft: wp('5%')}}
          iconRight={true}
          icon={<Text fontWeight={'700'} fontSize={'18px'} color={'#FFFFFF'}>{`$${meal.price}`}</Text>}
          onPress={onConfirmOrder}
        />
      </FlexBox>
    </FlexBox>
  )
}

interface FulfillmentSelectionProps {
  selectedFulfillment: Fulfillment;
  onPress: (selection: Fulfillment) => void;
}

const FulfillmentSelection = (props: FulfillmentSelectionProps) => {

  const { selectedFulfillment, onPress } = props;

  return(
    <FlexBox flexDirection={'row'}>
      {
        fulfillment.map((f, index) => {
          const isSelected = f === selectedFulfillment;
          return (
            <FlexItem flexGrow={1} key={index}>
              <TouchableOpacity onPress={() => {onPress(f)}}>
                <FlexBox flexDirection={'column'}>
                  <Text ml={"auto"} mr={"auto"} fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={isSelected ? defaultTheme.colors.white  : defaultTheme.colors.greySix } mb={getHeightInPixels('1.1%')}>
                    {f}
                  </Text>
                  <FulfillmentDivider isSelected={isSelected}/>
                </FlexBox>
              </TouchableOpacity>
            </FlexItem>
          )
        })
      }
    </FlexBox>
  )
}


/**
 * This will eventually get it's data from the users profile
 */

const PaymentMethod = () => {
  return(
    <FlexBox flexDirection={'column'} height={getHeightInPixels('7%')} mb={getHeightInPixels("3.4%")}>
      <Text color={defaultTheme.colors.white} fontSize={defaultTheme.fontSize.m} fontWeight='600'>
        Payment Method
      </Text>
      <FlexBox flexDirection={'row'} height={getHeightInPixels('5%')} mt={getHeightInPixels('1.3%')} justifyContent={"space-between"}>
        <FlexBox flexDirection={'row'}>
          <Visa />
          <FlexItem alignItems={'center'}>
            <FlexBox flexDirection={'column'} ml={wp('3.5%')} pt={getHeightInPixels('1.1%')}>
              <Text color={defaultTheme.colors.white} fontSize={defaultTheme.fontSize.sm} fontWeight='400'>Visa...5834</Text>
              <Text color={defaultTheme.colors.greySix} fontSize={defaultTheme.fontSize.sm} fontWeight='400'>05/2024</Text>
            </FlexBox>
          </FlexItem>
        </FlexBox>
        <Button onPress={() => {}} icon={<MaterialCommunityIcon name={"chevron-right"} size={25} color={"#FFFFFF"}/>} />
      </FlexBox>
    </FlexBox>
  )
}