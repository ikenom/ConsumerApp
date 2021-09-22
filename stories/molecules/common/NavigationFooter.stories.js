import React from 'react';
import {storiesOf} from '@storybook/react-native';
import { NavigationFooter } from '../../../src/components/molecules/common/NavigationFooter';
import {Box} from '../../../src/components/atoms/layout/Box';
import { OrderConfirmationHeader } from '../../../src/components/pages/order/common/OrderConfirmationHeader';

export const NavigationFooterStory = () => {
    return (
        <NavigationFooter />
    );
}

export const ConfirmationHeaderStory = () => {
    return (
        <Box backgroundColor='black'>
            <OrderConfirmationHeader
                label={'Title'}
                icon="chevron-left"
                iconPosition="left"
                onPress={() => { }} />
        </Box>
    )
}

storiesOf('Molecules', module)
    .add('Navigation Footer', () => NavigationFooterStory())
    .add('Confirmation Header', () => ConfirmationHeaderStory());