import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { TileDisplay } from '../../../src/components/molecules/common/TileDisplay';
import { MOCK_MEALS_ALL_INFO } from '../../../src/models/meal/util';

export const TileDisplayStory = () => {
    return(
        <TileDisplay meals={MOCK_MEALS_ALL_INFO} />
    )
}

storiesOf('Molecules', module).add('Tile Display', () => TileDisplayStory());