import {number} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Text, View} from 'react-native';
import { FlexBox } from '../../../src/components/atoms/layout/Box';
import {Notification} from '../../../src/components/atoms/notification/Notification';

storiesOf('Notification', module).add('Notification', () => {
    const notification = {
        notificationId: Date.now(),
        leftNotificationAction: {
            actionColor: 'red',
            actionText: 'delete'
        },
        rightNotificationAction: {
            actionColor: 'green',
            actionText: 'mark as read'
        },
        notificationText: 'This is a test',
        notificationTimestamp: Date.now()}
  return (
      <FlexBox width="100%" alignItems="center">
        <View style={{width:'80%'}}>
          <Notification {...notification}/>
        </View>
    </FlexBox>
      
  );
});
