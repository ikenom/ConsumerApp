import {number, text} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import {Box} from '../../src/components/atoms/layout/Box';


storiesOf('Layout', module).add('to Storybook', () => {
  const children = text(
    'text',
    'The quick brown fox jumped over the lazy dog.'
  );

  const margin = number('margin', 0);
  const padding = number('padding', 0);

  return (
    <Box color={'#4785FE'} bg={'#123456'} m={margin} p={padding}>
      <Text>The quick brown fox jumped over the lazy dog.'</Text>
    </Box>
  );
});
