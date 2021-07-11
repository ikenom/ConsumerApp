import React from 'react';
import { FlexBox, Box } from "../../atoms/layout/Box";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { MealCard } from '../../atoms/card/Card';
import { Meal } from '../../../models/meal/meal';

export interface TileDisplayProps {
    meals: Array<Meal>
    columns: number;
    columnWidthPercent: number;
}

export const TileDisplay = (props: TileDisplayProps) => {
    const { meals } = props
    return (
        <FlexBox flexDirection='row'>
            <FlexBox backgroundColor='turquoise' width={wp('50%')} height={hp('100%')} flexDirection='column'>
                {meals.map(
                    (meal, idx) => (
                        <Box backgroundColor='pink' width={wp('50%')} mb={hp('0.8%')}>
                            <MealCard
                                key={idx}
                                meal={meal}
                                layoutType='vertical'
                                onPress={() => { }} />
                        </Box>))
                }
            </FlexBox>
            <FlexBox backgroundColor='yellow'
                width={hp('50%')}
                flexDirection='column'>
                {meals.map(
                    (meal, idx) => (
                        <Box mb={hp('0.8%')} width={wp('50%')}>
                            <MealCard
                                key={idx}
                                meal={meal}
                                layoutType='vertical'
                                onPress={() => { }} />
                        </Box>))
                }
            </FlexBox>
        </FlexBox>
    );
}