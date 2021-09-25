import React from 'react';
import {storiesOf} from '@storybook/react-native';
import { NavigationFooter } from '../../../src/components/molecules/common/NavigationFooter';

export const NavigationFooterStory = () => {
    return (
        <NavigationFooter />
    );
}

storiesOf('Molecules', module)
    .add('Navigation Footer', () => NavigationFooterStory());