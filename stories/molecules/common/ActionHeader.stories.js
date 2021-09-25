import { storiesOf } from '@storybook/react-native';
import { ScrollView } from 'react-native';
import { OrderConfirmationHeader } from '../../../src/components/pages/order/common/OrderConfirmationHeader';
import React from 'react';
import { Box } from '../../../src/components/atoms/layout/Box';

export const ActionHeaderStory = () => {
  const testProps = [
    {
      label: 'Chevron Left - Left',
      icon: 'chevron-left',
      iconPosition: 'left'
    },
    {
      label: 'Chevron - Left',
      icon: 'chevron',
      iconPosition: 'left'
    },
    {
      label: 'Chevron Left - Right',
      icon: 'chevron-left',
      iconPosition: 'right'
    },
    {
      label: 'Chevron - Right',
      icon: 'chevron',
      iconPosition: 'right'
    }
  ]
  return (
    <ScrollView>
      {testProps.map(
        (element) => (
          <Box backgroundColor='black'>
            <OrderConfirmationHeader label={element.label} icon={element.icon} iconPosition={element.iconPosition} />
          </Box>
        )
      )}
    </ScrollView>
  );
}

storiesOf('Headers', module)
  .add('Action Header', () => ActionHeaderStory());