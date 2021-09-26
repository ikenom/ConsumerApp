import {storiesOf} from '@storybook/react-native';
import React from "react";
import { FeaturedView } from '../../src/components/pages/navigation/Featured';
import { HomeView } from '../../src/components/pages/navigation/Home';
import { SeeAsTilesView } from '../../src/components/pages/navigation/SeeAsTiles';
import { MOCK_MEALS, MOCK_MEALS_ENRICHED } from '../../src/models/meal/util';


const NavigationHomeStory = () => {
    const slideshowImages = MOCK_MEALS_ENRICHED.map(
        (meal) => meal.image
    );
    return (
        <HomeView
            locationName="Harlem"
            slideshowImages={slideshowImages}
            meals={{
                new: MOCK_MEALS_ENRICHED,
                popular: MOCK_MEALS_ENRICHED,
                orderAgain: MOCK_MEALS_ENRICHED
            }}
        />
    )
}

const NavigationTilesStory = () => {
    return(
        <SeeAsTilesView title="Order Again" meals={MOCK_MEALS_ENRICHED}/>
    )
}

const NavigationSlideshowStory = () => {
    const featureImg = MOCK_MEALS[0].image;
    return (<FeaturedView
        title={'Where to eat in NYC'}
        subtitle={'We put together the best locales.'}
        imageUri={featureImg}
        text={'Running a restaurant in New York City in any era is a herculean task.'
            + ' We tend to love any place willing to feed us, but some simply stand out for their excellent ingredients.'
            + '\r\n\r\n'
            + ' And these are those: our favorite places to eat and drink,'
            + ' and our favorite places to tell everyone else to eat and drink, at this very moment.'
            + ' Some are old, some are new, some are finally getting their due, and each one is worth your time,'
            + ' money and attention.'} />
    );
}

storiesOf('Pages', module)
    .add('Navigation - Home', () => NavigationHomeStory())
    .add('Navigation - Tiles', () => NavigationTilesStory())
    .add('Navigation - Featured', () => NavigationSlideshowStory());