import React from 'react';
import { FlexBox, Box } from "../../atoms/layout/Box";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { MealCard } from '../../atoms/card/Card';
import { EnrichedMeal } from '../../../models/meal/meal';

export interface TileDisplayProps {
    meals: EnrichedMeal[]
}

export type Parity = 'even' | 'odd';

export const getItemsByParity = (array: Array<any>, parity: Parity) => {
    const remainder = (parity === 'even' ? 0 : 1)
    return array.filter(
        (element, idx) => ((idx % 2) == remainder)
    )
}

export const TileDisplay = (props: TileDisplayProps) => {
    const { meals } = props
    const mealTiles = meals.map(
        (meal) => (
            <Box width={wp('50%')} mb={hp('0.8%')} alignItems='center'>
                <MealCard
                    key={meal.id}
                    meal={meal}
                    onPress={() => { }} />
            </Box>))

    return (
        <FlexBox flexDirection='row'>
            <FlexBox
                key="evens"
                width={wp('50%')}
                flexDirection='column'>
                {getItemsByParity(mealTiles, 'even')}
            </FlexBox>
            <FlexBox
                key="odds"
                width={wp('50%')}
                flexDirection='column'>
                {getItemsByParity(mealTiles, 'odd')}
            </FlexBox>
        </FlexBox>
    );
}