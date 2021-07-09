import {storiesOf} from '@storybook/react-native';
import React from "react";
import { HomeView } from '../../src/components/pages/navigation/Home';
import { MOCK_MEALS_ALL_INFO } from '../../src/models/meal/util';


export const NavigationHomeStory = () => {
    const slideshowImages = MOCK_MEALS_ALL_INFO.map(
        (meal) => meal.image
    );
    return (
        <HomeView
            locationName="Harlem"
            newsTiles={slideshowImages}
            meals={{
                new: MOCK_MEALS_ALL_INFO,
                popular: MOCK_MEALS_ALL_INFO,
                orderAgain: MOCK_MEALS_ALL_INFO
            }}
        />
    )
}

storiesOf('Pages', module)
    .add('Navigation - Home', () => NavigationHomeStory());