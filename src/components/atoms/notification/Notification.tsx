import React from 'react';
import {Text} from '../../atoms/typography/Text';
import {FlexBox, Box} from '../layout/Box';
import {StyleSheet, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

export enum ActionVariant {
  positive,
  negative,
  custom,
}

enum ActionPosition {
  left,
  right,
}

export interface NotificationAction {
  actionVariant: ActionVariant;
  actionColor: string;
  actionText: string;
  onActionSwipe: () => void;
}

export interface Notification {
  notificationId: string;
  leftNotificationAction: NotificationAction;
  rightNotificationAction: NotificationAction;
  notificationText: string;
  notificationTimestamp: number;
  notificationSeen: boolean;
  keywords: Array<String>;
  imageURL: string;
}

const renderAction = (
  notificationAction: NotificationAction,
  position: ActionPosition,
) => {
  const {actionColor, actionText} = notificationAction;
  const alignItems =
    position == ActionPosition.left ? 'flex-start' : 'flex-end';
  const padding =
    position == ActionPosition.left
      ? {
          padding: 5,
          paddingEnd: '20%',
        }
      : {
          paddingEnd: 5,
          paddingStart: '20%',
        };

  const style = {
    backgroundColor: actionColor,
    ...padding,
  };

  return (
    <View
      style={style}
      flex={1}
      alignItems={alignItems}
      justifyContent="center">
      <Text
        color={styles.notificationActionText.color}
        fontSize={styles.notificationActionText.fontSize}
        fontWeight={styles.notificationActionText.fontWeight}
        wordWrap="wrap"
        flexWrap="wrap"
        flex={-1}
        textAlign="center">
        {actionText.toUpperCase()}
      </Text>
    </View>
  );
};

const renderActionContainer = (notification: Notification) => {
  const {leftNotificationAction, rightNotificationAction} = notification;

  return (
    <FlexBox
      flexDirection={'row'}
      position="absolute"
      width="100%"
      flexGrow={1}
      backgroundColor={'red'}
      top={0}
      left={0}
      height={'100%'}
      borderRadius={8}
      overflow={'hidden'}>
      {leftNotificationAction &&
        renderAction(leftNotificationAction, ActionPosition.left)}
      {rightNotificationAction &&
        renderAction(rightNotificationAction, ActionPosition.right)}
    </FlexBox>
  );
};

const buildNotificationText = () => {
  return (
    <Text style={styles.notificationText}>
      Your order is ready for pick up at Harlem Tavern sdf sdfsdf
    </Text>
  );
};

const renderIndicator = () => {
  return <Text style={styles.indicator}>● </Text>;
};

const buildTimeAgoText = () => {
  const timeAgo = moment.unix(1631859841).fromNow();
  return (
    <Text style={styles.timeAgoText}>
      {renderIndicator()}
      <Text>{timeAgo}</Text>
    </Text>
  );
};

const renderNotificationContent = (notification: Notification) => {
  return (
    <FlexBox
      flexDirection={'row'}
      width={'100%'}
      backgroundColor={styles.notification}
      paddingTop={12}
      paddingStart={8}
      paddingRight={12}
      paddingBottom={12}
      borderRadius={8}>
      <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
        style={styles.notificationImage}
      />

      <FlexBox flexShrink={1}>
        {buildNotificationText()}
        {buildTimeAgoText()}
      </FlexBox>
    </FlexBox>
  );
};

export const Notification = (notification: Notification) => {
  const {notificationId} = notification;
  return (
    <FlexBox style={{...styles.notificationContainer}}>
      {renderActionContainer(notification)}
      {renderNotificationContent(notification)}
    </FlexBox>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flex: -1,
  },
  notificationActionContainer: {},
  notificationAction: {
    //flexGrow: 1,
  },
  notificationActionText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  notification: {
    backgroundColor: '#191919',
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
  },
  notificationText: {
    color: 'white',
    flexWrap: 'wrap',
    flex: -1,
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    lineHeight: 21.12,
  },
  timeAgoText: {
    fontWeight: '400',
    fontSize: 16,
    fontFamily: 'Helvetica Neue',
    lineHeight: 23.52,
    color: '#B4B4B4',
  },
  indicator: {
    color: '#4A82F8',
  },
});
