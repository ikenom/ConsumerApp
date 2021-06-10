import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {storiesOf} from '@storybook/react-native';
import { Box, FlexBox, FlexItem } from '../../../src/components/atoms/layout/Box';
import { Text } from '../../../src/components/atoms/typography/Text';
import { ExpandableAccordion } from "../../../src/components/molecules/common/BottomExpandableAccordion"
import { defaultTheme } from '../../../src/defaultTheme';
import { PickUpInstructionsSheet, PickUpInstructionsBottomSheet } from "../../../src/components/pages/order/sheets/OrderConfirmationSheets"


const TestChild = () => {

  return (
    <FlexBox height={hp('70%')} bg={defaultTheme.colors.greyThree} flexDirection={'row'} justifyContent={'center'}>
      <FlexBox justifyContent={'center'} flexDirection={'row'}>
        <Text color={defaultTheme.colors.white} fontSize={defaultTheme.fontSize.lg}>{"~~ <(O.O<) (>O_O)>"}</Text>
      </FlexBox>
    </FlexBox>
  )
}

const ExpandableAccordionStory = () => {
  return(
    <Box height={hp('100%')} bg={defaultTheme.colors.blue}>
      <FlexBox
      bg="#4785FE"
      m={wp('4%')}
      mt={hp('20%')}
      p={wp('4%')}
      flexDirection={'column'}>
      <FlexItem
        backgroundColor={'#F8F078'}
        height={hp('8%')}
        flexGrow={1}
        flexShrink={0}
      />
      <FlexItem
        backgroundColor={'#FF2727'}
        height={hp('8%')}
        flexGrow={1}
        flexShrink={0}
      />
      <FlexItem
        backgroundColor={'#1C953E'}
        height={hp('8%')}
        flexGrow={1}
        flexShrink={0}
      />
    </FlexBox>
      <ExpandableAccordion label={"Pick up Instructions"} backgroundColor={defaultTheme.colors.blackTwo} childHeight={hp('70%')}>
        <TestChild/>
      </ExpandableAccordion>   
    </Box>
  )
}

const PickUpInstructionsStory = () => {
  return(
    <Box height={hp('100%')} bg={defaultTheme.colors.blue}>
      <FlexBox
      bg="#4785FE"
      m={wp('4%')}
      mt={hp('20%')}
      p={wp('4%')}
      flexDirection={'column'}>
      <FlexItem
        backgroundColor={'#F8F078'}
        height={hp('8%')}
        flexGrow={1}
        flexShrink={0}
      />
      <FlexItem
        backgroundColor={'#FF2727'}
        height={hp('8%')}
        flexGrow={1}
        flexShrink={0}
      />
      <FlexItem
        backgroundColor={'#1C953E'}
        height={hp('8%')}
        flexGrow={1}
        flexShrink={0}
      />
    </FlexBox>
      <PickUpInstructionsBottomSheet customerFullName={"Travis Davidson"} order={{orderNumber: "12345", lineItems: [{price: "13.50", name: "Blackened Salmon Fillet"}]}}/>
    </Box>
  )
}

storiesOf('Expandable Accordions', module)
  .add('ExampleBase', () => ExpandableAccordionStory())
  .add('PickUp Instructions', () => PickUpInstructionsStory())
  ;
