import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { TileDisplay } from '../../../src/components/molecules/common/TileDisplay';
import { MOCK_MEALS_ENRICHED } from '../../../src/models/meal/util';
import { ScrollView } from 'react-native-gesture-handler';

export const TileDisplayStory = () => {
    return (
        <ScrollView>
            <TileDisplay meals={MOCK_MEALS_ENRICHED} />
        </ScrollView>
    )
}

storiesOf('Molecules', module).add('Tile Display', () => TileDisplayStory());