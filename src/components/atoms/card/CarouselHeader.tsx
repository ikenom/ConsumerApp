import React from 'react';
import { FlexBox, Box } from "../../atoms/layout/Box";
import { Text } from "../../atoms/typography/Text";
import { defaultTheme } from "../../../defaultTheme";
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CarouselHeaderProps {
  title: string
  navigateToShowAll: (title: string) => void;
}

export const CarouselHeader = (props: CarouselHeaderProps) => {

    const { title, navigateToShowAll } = props;

    const onPressShowAll = () => {
        navigateToShowAll(title)
    }

    return (
        <FlexBox flexDirection={'row'} pr='14px' alignItems='center'>
            <Box flexGrow={1}>
                <Text color={defaultTheme.colors.white} fontWeight={'400'} fontSize={defaultTheme.fontSize.lg}>
                    {title}
                </Text>
            </Box>
            <TouchableOpacity onPress={onPressShowAll}>
            <Box>
                <Text
                    color={defaultTheme.colors.blue}
                    fontWeight={'600'}
                    fontSize={defaultTheme.fontSize.m}
                    font={defaultTheme.fontFamily.hnt}>Show All
                    </Text>
            </Box>
            </TouchableOpacity>
        </FlexBox>
    )
}

export default CarouselHeader;