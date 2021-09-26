import React from 'react';
import {storiesOf} from '@storybook/react-native';
import { NavigationFooter } from '../../../src/components/molecules/common/NavigationFooter';

const NavigationFooterStory = () => {
    return (
        <NavigationFooter />
    );
}

storiesOf('Molecules', module)
    .add('Navigation Footer', () => NavigationFooterStory());