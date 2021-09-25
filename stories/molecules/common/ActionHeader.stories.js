import { storiesOf } from '@storybook/react-native';
import { ScrollView } from 'react-native';
import { OrderConfirmationHeader } from '../../../src/components/pages/order/common/OrderConfirmationHeader';
import React from 'react';
import { Box } from '../../../src/components/atoms/layout/Box';

export const ActionHeaderStory = () => {
  const testProps = [
    {
      label: 'Back Arrow (Left)',
      leftIcon: "back-arrow"
    },
    {
      label: 'Back Arrow (Right)',
      rightIcon: "back-arrow"
    },
    {
      label: 'Share (Left)',
      leftIcon: "share"
    },
    {
      label: 'Back Arrow - Share',
      leftIcon: "back-arrow",
      rightIcon: "share"
    },
    {
      label: 'Info (Left)',
      leftIcon: "info"
    },
    {
      label: 'Back Arrow - Info',
      leftIcon: "back-arrow",
      rightIcon: "info"
    },
    {
      label: 'Back Arrow - Close',
      leftIcon: "back-arrow",
      rightIcon: "close"
    },
    {
      label: 'Unsupported Icon (Left)',
      leftIcon: 'not-supported'
    },
    {
      label: 'Unsupported Icon (Right)',
      rightIcon: 'not-supported'
    }
  ]
  return (
    <ScrollView>
      {testProps.map(
        (element) => (
          <Box backgroundColor='black' mb='10px' pt='5px' pb='5px'>
            <OrderConfirmationHeader label={element.label} leftIcon={element.leftIcon} rightIcon={element.rightIcon} />
          </Box>
        )
      )}
    </ScrollView>
  );
}

storiesOf('Headers', module)
  .add('Action Header', () => ActionHeaderStory());