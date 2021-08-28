import {storiesOf} from '@storybook/react-native';
import React from "react";
import { HomeView } from '../../src/components/pages/navigation/Home';
import { SeeAsTilesView } from '../../src/components/pages/navigation/SeeAsTiles';
import { MOCK_MEALS_ALL_INFO } from '../../src/models/meal/util';


export const NavigationHomeStory = () => {
    const slideshowImages = MOCK_MEALS_ALL_INFO.map(
        (meal) => meal.image
    );
    return (
        <HomeView
            locationName="Harlem"
            slideshowImages={slideshowImages}
            meals={{
                new: MOCK_MEALS_ALL_INFO,
                popular: MOCK_MEALS_ALL_INFO,
                orderAgain: MOCK_MEALS_ALL_INFO
            }}
        />
    )
}

export const NavigationTilesStory = () => {
    return(
        <SeeAsTilesView title="Order Again" />
    )
}

storiesOf('Pages', module)
    .add('Navigation - Home', () => NavigationHomeStory())
    .add('Navigation - Tiles', () => NavigationTilesStory());