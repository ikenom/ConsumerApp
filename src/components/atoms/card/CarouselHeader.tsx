import React from 'react';
import { FlexBox, Box } from "../../atoms/layout/Box";
import { MaterialCommunityIcon } from "../../atoms/icons/matericalCommunictyIcon";
import { Text } from "../../atoms/typography/Text";
import { defaultTheme } from "../../../defaultTheme";

interface CarouselHeaderProps {
  title: string;
  onPressSeeMore: () => void;
}

export const CarouselHeader = (props: CarouselHeaderProps) => {

    const { title, onPressSeeMore } = props;

    return (
        <FlexBox flexDirection={'row'} pr='14px' alignItems='center'>
            <Box flexGrow={1}>
                <Text color={defaultTheme.colors.white}
                    fontWeight={'400'}
                    fontSize={defaultTheme.fontSize.lg}>
                    {title}
                </Text>
            </Box>
            <Box>
                <MaterialCommunityIcon
                    name={'dots-horizontal'}
                    size={27} color={defaultTheme.colors.blue}
                    onPress={onPressSeeMore} />
            </Box>
        </FlexBox>
    )
}

export default CarouselHeader;