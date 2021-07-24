import React from 'react';
import { FlexBox } from '../atoms/layout/Box';
import { Spinner } from 'native-base';
import { defaultTheme } from '../../defaultTheme';

export const LoadingView = () => {
  return (
    <FlexBox justifyContent={'center'} alignItems={'center'} height={'100%'}>
      <Spinner color={defaultTheme.colors.greyOne} />
    </FlexBox>
  )
}