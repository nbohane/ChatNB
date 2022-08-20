import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FeedScreen} from './feed-screen';
import {GroupsScreen} from './groups-screen';
import {ConversationsScreen} from './conversations-screen';
import {AccountScreen} from './account-screen';
import {NewGroupScreen} from './new-group-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../components/config';
export const HomeScreen = ({logOutCallBack, navigation}): Node => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = 'home';
          } else if (route.name === 'Groups') {
            iconName = 'people';
          } else if (route.name === 'Account') {
            iconName = 'person';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name={'Feed'} component={FeedScreen} />
      <Tab.Screen name={'Groups'} component={GroupsScreen} />
      {/*<Tab.Screen name={'Conversations'} component={ConversationsScreen} />*/}
      <Tab.Screen name={'Account'}>
        {props => <AccountScreen {...props} logOutCallBack={logOutCallBack} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
