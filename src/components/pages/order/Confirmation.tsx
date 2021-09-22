import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Divider } from 'react-native-elements';
import styled from "styled-components";
import { DateTime } from "luxon";
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import MapBadge from '../../../../assets/svg/MapBadge.svg'
import { PickUpInstructionsBottomSheet, NutritionFactsBottomSheet } from './sheets/OrderConfirmationSheets';
import { FlexBox, Box } from '../../atoms/layout/Box';
import { defaultTheme } from '../../../defaultTheme';
import { Text } from '../../atoms/typography/Text';
import { Order } from '../../../models/order/order';
import { Restaurant } from '../../../models/restaurant/restaurant';
import { OrderConfirmationHeader } from './common/OrderConfirmationHeader';
import { LocationDisplay } from '../../molecules/common/LocationDisplay';
import { Ionicon } from "../../atoms/icons/Ionicons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RestaurantParamList } from '../../../navigator/RestaurantStack';


const StyledDivider = styled(Divider)<{height: number, mt: number, mb?: number}>`
  backgroundColor: ${defaultTheme.colors.whiteThree};
  height: ${({height}) => height};
  borderRadius: 4px;
  marginTop: ${({mt}) => mt};
  marginBottom: ${({mb}) => mb ? mb : 0};
`;
export interface OrderConfirmationProps {
  order: Order,
  restaurant: Restaurant,
  navigation?: StackNavigationProp<RestaurantParamList, 'ConfirmationView'>,
  serializedOrder?: string
}

export const ConfirmationNavigatorContainer = (props: StackScreenProps<RestaurantParamList, 'ConfirmationView'>) => {
  const { navigation, route } = props;

  return(
    <Confirmation {...route.params} navigation={navigation}/>
  )
}

export const Confirmation = (props: OrderConfirmationProps) => {
  const insets = useSafeAreaInsets();
  const { order, restaurant, serializedOrder } = props;

  const unSerializedOrder = serializedOrder ? JSON.parse(serializedOrder) as Order : order;
  return (
    <FlexBox flexDirection={'column'} bg={defaultTheme.colors.black} width={wp("100%")} height={hp('92%')} justifyContent={'space-between'} pt={insets.top}>
      <FlexBox flexDirection={'column'} pl={wp('4%')} pr={wp('4%')}>
        <OrderConfirmationHeader label={'Order Complete'} icon={'cross'} iconPosition={'right'} onPress={() => {}}/>
        <TimeDisplay dateTime={unSerializedOrder.fulfillmentDetails.fulfillmentTime}/>
        <StyledDivider height={1} mt={hp('1.1%')} mb={hp('2%')}/>
        <RestaurantDisplay restaurant={restaurant}/>
        <StyledDivider height={1} mt={hp('1.1%')} mb={hp('2%')}/>
        <OrderSummary order={unSerializedOrder}/>
        <StyledDivider height={1} mt={0} mb={hp('1.5%')}/>
        <FlexBox flexDirection={'column'}>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>Additional Note</Text>
          <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.sm} color={defaultTheme.colors.greySix}>{unSerializedOrder.additionalNote}</Text>
        </FlexBox>
        <StyledDivider height={1} mt={hp('1.1%')} mb={hp('1.5%')}/>
        <OrderTotal order={unSerializedOrder}/>
      </FlexBox>
      <FlexBox flexDirection={'column'} width={wp('100%')}>
        <NutritionFactsBottomSheet nutrition={unSerializedOrder.lineItems[0].nutrition}/>
        <PickUpInstructionsBottomSheet order={unSerializedOrder} />
      </FlexBox>
    </FlexBox>
)}

interface RestaurantDisplayProps {
  restaurant: Restaurant
}

const RestaurantDisplay = (props: RestaurantDisplayProps) => {
  const { restaurant } = props;
  return (
    <FlexBox flexDirection={'row'} justifyContent={'space-between'}>
      <FlexBox flexDirection={'column'}>
        <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white} mb={hp('1.3%')}>
          {restaurant.name}
        </Text>
        <LocationDisplay location={restaurant.location} highlighted={false}/>
        <Box mt={hp('1.4%')}>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white} mb={hp('1.3%')}>
            {`(${restaurant.phoneNumber.substr(0, 3)}) ${restaurant.phoneNumber.substr(3, 3)} - ${restaurant.phoneNumber.substr(6, 4)}`}
          </Text>
        </Box>
      </FlexBox>
      <Box position={'relative'}>
        <MapBadge />
        <Box position={'absolute'} left={wp('.8%')}>
          <Ionicon name={'md-location-sharp'} size={25} color={defaultTheme.colors.blue}/>
        </Box>
      </Box>
    </FlexBox>
  )
} 

interface OrderSummaryProps {
  order: Order
}

const OrderSummary = (props: OrderSummaryProps) => {
  const { order } = props;
  const meal = order.lineItems[0]
  return(
    <FlexBox flexDirection={'column'}>
      <Box ml={'auto'} mr={'auto'}>
        <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white} mb={hp('1.3%')}>
          Order Summary
        </Text>
      </Box>
      <FlexBox flexDirection={'row'} justifyContent={"space-between"} mb={hp("1.5%")}>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>Order Number</Text>
          <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>{`#${order.orderNumber}`}</Text>
        </FlexBox>
      <FlexBox flexDirection={'column'}>
        <Text fontWeight={'400'} fontSize={'18px'} color={defaultTheme.colors.white} mb={hp('1.1%')}> Items </Text>
        <FlexBox flexDirection={'row'} justifyContent={"space-between"} mb={hp("2.5%")}>
          <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.sm} color={defaultTheme.colors.greySix}>{`1. ${meal.name}`}</Text>
          <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.sm} color={defaultTheme.colors.greySix}>{`$${meal.price}`}</Text>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

const OrderTotal = (props: OrderSummaryProps) => {
  const { order } = props;
  const subTotal = order.subTotal;
  const fees = order.taxesAndFees;
  const total = (Number.parseFloat(subTotal) + Number.parseFloat(fees)).toFixed(2)
  return(
    <FlexBox flexDirection={'column'}>
      <FlexBox flexDirection={'row'} justifyContent={"space-between"} mb={hp("1.5%")}>
        <Text fontWeight={'600'} fontSize={'18px'} color={defaultTheme.colors.white}>Order Total</Text>
        <Text fontWeight={'600'} fontSize={'18px'} color={defaultTheme.colors.white}>{`$${total}`}</Text>
      </FlexBox>
      <FlexBox flexDirection={'row'} justifyContent={"space-between"} mb={hp("0.5%")}>
        <Text fontWeight={'500'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>Subtotal</Text>
        <Text fontWeight={'500'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>{`$${subTotal}`}</Text>
      </FlexBox>
      <FlexBox flexDirection={'row'} justifyContent={"space-between"} mb={hp("1.5%")}>
        <Text fontWeight={'500'} fontSize={defaultTheme.fontSize.xsm} color={defaultTheme.colors.greySix}>{'Fees & Taxes'}</Text>
        <Text fontWeight={'500'} fontSize={defaultTheme.fontSize.xsm} color={defaultTheme.colors.greySix}>{`$${fees}`}</Text>
      </FlexBox>
    </FlexBox>
  )
}
interface TimeDisplayProps {
  dateTime: DateTime;
}
const TimeDisplay = (props: TimeDisplayProps) => {
  const { dateTime } = props;
  return(
    <FlexBox flexDirection={'column'} alignItems={'center'} mt={hp('2.9%')}>
      <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>
        {dateTime.toFormat('MMMM dd, y')}
      </Text>
      <FlexBox flexDirection={'row'} alignItems={'flex-start'} mt={'0.4%'}>
        <Text fontWeight={'600'} fontSize={'65px'} color={defaultTheme.colors.white}>
          {dateTime.toFormat('hh:mm')}
        </Text>
        <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>
          {dateTime.toFormat('a')}
        </Text>
      </FlexBox>
      <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>
        Pickup Time
      </Text>
    </FlexBox>
  )
}