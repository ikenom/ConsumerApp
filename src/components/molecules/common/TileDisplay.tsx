import React from 'react';
import { FlexBox, Box } from "../../atoms/layout/Box";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { BigCard } from '../../atoms/card/Card';
import { EnrichedMeal } from '../../../models/meal/meal';

export interface TileDisplayProps {
    meals: EnrichedMeal[]
}

export const TileDisplay = (props: TileDisplayProps) => {
    const { meals } = props
    const mealTiles = meals.map(
        (meal) => (
            <Box
                alignItems='center'
                mb={hp('1.5%')}>
                <BigCard
                    key={meal.id}
                    meal={meal}
                    onPress={() => { }} />
            </Box>))

    return (
        <FlexBox flexDirection='column'>
            {mealTiles}
        </FlexBox>
    );
}