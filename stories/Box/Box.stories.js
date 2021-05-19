import {number, text} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Text } from 'react-native';
import {Box} from '../../src/components/atoms/layout/Box';


storiesOf('Layout', module).add('to Storybook', () => {
  const margin = number('margin', 100);
  const padding = number('padding', 100);

  return (
    <Box bg="#4785FE" alignitems="center" mt={margin} p={padding}>
      <Text>Hello from a box component!</Text>
    </Box>
  );
});