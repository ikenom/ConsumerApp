import React from 'react';
import {FlexBox} from '../../../src/components/atoms/layout/Box';
import {Text} from '../../../src/components/atoms/typography/Text';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {storiesOf} from '@storybook/react-native';

const TypographyStory = () => {
  return (
    <FlexBox
      height={hp('40%')}
      p={hp('5%')}
      justifyContent={'space-between'}
      alignItems={'center'}
      backgroundColor={'#4785FE'}>
      <Text fontSize={wp('3%')} weight={50} margin={hp('1%')} color={'#FFFFFF'}>
        {'~~~ <(O.O<) (>O_O)> ~~~~'}
      </Text>
      <Text fontSize={wp('4%')} weight={200} margin={hp('1%')} color={'#F9F9F9'}>
        {'~~~ <(O.O<) (>O_O)> ~~~~'}
      </Text>
      <Text fontSize={wp('6%')} weight={400} margin={hp('1%')} color={'#000000'}>
        {'~~~ <(O.O<) (>O_O)> ~~~~'}
      </Text>
      <Text fontSize={wp('7%')} weight={800} margin={hp('1%')} color={'#E3E1D3'}>
        {'(>O_O)> <(O.O<)'}
      </Text>
      <Text color={'#FF2727'} fontSize={wp('4%')} weight={'bold'} margin={hp('1%')}>
        {'Easy to add space around and have responsive design'}
      </Text>
    </FlexBox>
  );
};

storiesOf('Typography', module).add('Box', () => TypographyStory());
