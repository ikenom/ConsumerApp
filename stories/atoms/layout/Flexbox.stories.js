import {select} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {FlexBox, FlexItem} from '../../../src/components/atoms/layout/Box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

storiesOf('Layout', module).add('Flexbox', () => {
  const flexDirection = select('flexDirection', ['row', 'column']);

  return (
    <FlexBox
      bg="#4785FE"
      m={wp('4%')}
      mt={hp('20%')}
      p={wp('4%')}
      flexDirection={flexDirection}>
      <FlexItem
        backgroundColor={'#F8F078'}
        height={hp('8%')}
        flexGrow={1}
        flexShrink={0}
      />
      <FlexItem
        backgroundColor={'#FF2727'}
        height={hp('8%')}
        flexGrow={1}
        flexShrink={0}
      />
      <FlexItem
        backgroundColor={'#1C953E'}
        height={hp('8%')}
        flexGrow={1}
        flexShrink={0}
      />
    </FlexBox>
  );
});
