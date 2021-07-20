import React from "react";
import { MaterialCommunityIcon } from "../../atoms/icons/matericalCommunictyIcon";
import { defaultTheme } from "../../../defaultTheme";
import { Text } from "../../atoms/typography/Text";
import { FlexBox, Box } from "../../atoms/layout/Box";

export interface NavigationFooterProps {
    profileImage?: any;
}

export const NavigationFooter = (props: NavigationFooterProps) => {
    return (
        <FlexBox flexDirection={'row'} pt={'13px'} justifyContent='center'>
            <Box flexGrow={1} alignItems='center'>
                <MaterialCommunityIcon name={'home'} size={27} color={defaultTheme.colors.blue} />
                <Text color={defaultTheme.colors.blue} fontSize={defaultTheme.fontSize.xsm}>Home</Text>
            </Box>
            <Box flexGrow={1} alignItems='center' pl={'33px'} pr={'33px'}>
                <MaterialCommunityIcon name={'filter-variant'} size={27} color={defaultTheme.colors.greyEight} />
                <Text color={defaultTheme.colors.greyEight} fontSize={defaultTheme.fontSize.xsm}>Discover</Text>
            </Box>
            <Box flexGrow={1} alignItems='center'>
                <MaterialCommunityIcon name={'account-circle'} size={27} color={defaultTheme.colors.greyEight} />
                <Text color={defaultTheme.colors.greyEight} fontSize={defaultTheme.fontSize.xsm}>Profile</Text>
            </Box>
        </FlexBox>
    );
}