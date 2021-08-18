import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { TileDisplay } from '../../../src/components/molecules/common/TileDisplay';
import { MOCK_MEALS_ALL_INFO } from '../../../src/models/meal/util';
import { ScrollView } from 'react-native-gesture-handler';

export const TileDisplayStory = () => {
    const mealCards = MOCK_MEALS_ALL_INFO.map(
        (meal) => {
            return { 
                meal: meal, displayDistance: true, 
                flagged: true, // Flags look like trash right now but will fix with redesign
                restaurantName: "Restaurant Name Here" }
        }
    )
    console.log(mealCards)
    return (
        <ScrollView>
            <TileDisplay mealCards={mealCards} />
        </ScrollView>
    )
}

storiesOf('Molecules', module).add('Tile Display', () => TileDisplayStory());