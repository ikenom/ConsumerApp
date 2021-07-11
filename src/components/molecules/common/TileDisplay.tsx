import React from 'react';
import { FlexBox, Box } from "../../atoms/layout/Box";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { MealCard } from '../../atoms/card/Card';
import { Meal } from '../../../models/meal/meal';
import { HttpLink } from '@apollo/client';

export interface TileDisplayProps {
    meals: Array<Meal>
}

export const TileDisplay = (props: TileDisplayProps) => {
    const { meals } = props
    return (
        <FlexBox height={hp('100%')} flexDirection='column'>
            {meals.map(
                (meal, idx) => (<MealCard
                    key={idx}
                    meal={meal}
                    layoutType='vertical'
                    onPress={() => { }} />))
            }
        </FlexBox>
    );
}