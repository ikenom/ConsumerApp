import { storiesOf } from '@storybook/react-native';
import { ScrollView } from 'react-native';
import { OrderConfirmationHeader } from '../../../src/components/pages/order/common/OrderConfirmationHeader';
import React from 'react';
import { Box } from '../../../src/components/atoms/layout/Box';

export const ActionHeaderStory = () => {
  return (
    <ScrollView>
      <Box backgroundColor='black'>
        <OrderConfirmationHeader label='Text Here' icon='chevron-left' iconPosition='left' />
      </Box>
    </ScrollView>
  );
}

storiesOf('Headers', module)
  .add('Action Header', () => ActionHeaderStory());