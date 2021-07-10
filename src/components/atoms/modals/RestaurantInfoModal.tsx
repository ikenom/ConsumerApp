import React, { useState } from 'react';
import { Image } from 'react-native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { defaultTheme } from '../../../defaultTheme';
import { Restaurant } from '../../../models/restaurant/restaurant';
import { Ionicon } from '../icons/Ionicons';
import { MaterialCommunityIcon } from '../icons/matericalCommunictyIcon';
import { Box, FlexBox } from '../layout/Box';
import { Text } from '../typography/Text';
import { Button } from "react-native-elements/dist/buttons/Button";


export interface RestaurantInfoProps {
  restaurant: Restaurant;
  isVisible: boolean;
  onClose: () => void;
}

export const RestaurantInfoModal = (props: RestaurantInfoProps) => {
  const { restaurant, isVisible, onClose } = props;
  const { businessHours, name, image, description } = restaurant;

  return(
      <Modal 
        isVisible={isVisible} 
        backdropColor={defaultTheme.colors.black} 
        onBackdropPress={onClose}
        style={{borderRadius: 10}}>
        <Box bg={'#191919'}>
          <Box width={wp('90%')} height={hp('14%')} overflow={'hidden'} borderRadius={'5px'}>
            <Image style={{flex: 1, height: undefined, width: undefined}} source={image} />
          </Box>
          <Box pl={wp('2.5%')} pr={wp('2.5%')}>
            <Text mt={hp('1.3%')} mb={hp('1.1%')} fontWeight={'600'} fontSize={"24px"} color={defaultTheme.colors.white}>
              {name}
            </Text>
            <Text color={defaultTheme.colors.white} width={wp('55%')}>
              {description}
            </Text>
            <FlexBox flexDirection={'row'} alignContent={'center'} mb={hp('1.5%')} mt={hp('1.5%')}>
              <MaterialCommunityIcon name={'clock-time-three-outline'} size={23} color={defaultTheme.colors.greyTwo}/>
              <Box ml={wp('2%')} pt={'2px'} fontSize={defaultTheme.fontSize.m}>
                <Text color={defaultTheme.colors.white}>
                  {`${businessHours.openingTime} - ${businessHours.closingTime}`}
                </Text>
              </Box>
            </FlexBox>
            <FlexBox flexDirection={'row'} alignContent={'center'}>
              <Box pt={hp('0.4%')}>
                <Ionicon name={'md-location-sharp'} size={25} color={defaultTheme.colors.greyTwo}/>
              </Box>
              <FlexBox ml={wp('2%')} fontSize={defaultTheme.fontSize.m} flexDirection={'column'}>
                <Text color={defaultTheme.colors.blue} style={{textDecorationLine: 'underline'}}>
                  {`${restaurant.location.street}`}
                </Text>
                <Text color={defaultTheme.colors.blue} style={{textDecorationLine: 'underline'}}>
                  {`${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zipCode}`}
                </Text>
              </FlexBox>
            </FlexBox>
            <Button 
            title="View" 
            buttonStyle={{
              backgroundColor: defaultTheme.colors.blue, 
              height: hp('5.9%'), 
              borderRadius: 10,
              marginBottom: hp('2%'),
              marginTop: hp('5%')
            }}
            />
          </Box>
          {/* Need to navigate to restaurant view */}
        </Box>
      </Modal>
  )
}