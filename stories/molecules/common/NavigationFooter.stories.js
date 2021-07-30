import React from 'react';
import {storiesOf} from '@storybook/react-native';
import { NavigationFooter } from '../../../src/components/molecules/common/NavigationFooter';
import {Box} from '../../../src/components/atoms/layout/Box';

export const NavigationFooterStory = () => {
    return (
        <NavigationFooter />
    );
}

storiesOf('Molecules', module)
    .add('Navigation Footer', () => NavigationFooterStory());