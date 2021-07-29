import React from 'react';
import { FlexBox, Box } from "../../atoms/layout/Box";
import { MaterialCommunityIcon } from "../../atoms/icons/matericalCommunictyIcon";
import { Text } from "../../atoms/typography/Text";
import { defaultTheme } from "../../../defaultTheme";

interface CarouselHeaderProps {
  title: string
  onPressSeeMore: (title: string) => void;
}

export const CarouselHeader = (props: CarouselHeaderProps) => {

    const { title, onPressSeeMore } = props;

    const onPressIcon = () => {
        onPressSeeMore(title)
    }

    return (
        <FlexBox flexDirection={'row'} pr='14px' alignItems='center'>
            <Box flexGrow={1}>
                <Text color={defaultTheme.colors.white} fontWeight={'400'} fontSize={defaultTheme.fontSize.lg}>
                    {title}
                </Text>
            </Box>
            <Box>
                <MaterialCommunityIcon
                    onPress={onPressIcon}
                    name={'dots-horizontal'}
                    size={27} color={defaultTheme.colors.blue} />
            </Box>
        </FlexBox>
    )
}

export default CarouselHeader;