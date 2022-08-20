import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {LoginScreen} from './screens/login-screen';
import {RegisterScreen} from './screens/register-screen';
import {FeedScreen} from './screens/feed-screen';
import {Post} from './components/post';
import {NewPostScreen} from './screens/new-post-screen';
import {CCButton} from './components/cc-button';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {CommentFeedScreen} from './screens/comment-feed-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StackNavigator from '@react-navigation/stack/src/navigators/createStackNavigator';
import {LikesScreen} from './screens/likes-screen';
import {HomeScreen} from './screens/home-screen';
import {UserDetailsScreen} from './screens/user-details-screen';
import {GroupDetailsScreen} from './screens/group-details-screen';
import {CommentLikeScreen} from './screens/comment-like-screen';
import {User} from './components/user';
import {MembersScreen} from './screens/members-screen';
import {NewGroupScreen} from './screens/new-group-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from './components/config';
import {AccountScreen} from './screens/account-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {NbAvatar} from './components/nb-avatar';

const App: () => Node = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const Stack = createStackNavigator();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    if (userId) {
      setLoggedIn(true);
    }
    setLoaded(true);
  };

  const loginCallBack = async user => {
    console.log(user);
    await AsyncStorage.setItem('user_id', user.id.toString());
    setLoggedIn(true);
  };

  const logOutCallBack = async () => {
    await AsyncStorage.setItem('user_id', '');
    setLoggedIn(false);
  };

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {loggedIn ? (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={'Home'}>
              {props => (
                <HomeScreen {...props} logOutCallBack={logOutCallBack} />
              )}
            </Stack.Screen>
            <Stack.Screen name={'Comments'} component={CommentFeedScreen} />
            <Stack.Screen name={'Likes'} component={LikesScreen} />
            <Stack.Screen name={'NewPost'} component={NewPostScreen} />
            <Stack.Screen name={'UserDetails'} component={UserDetailsScreen} />
            <Stack.Screen
              name={'GroupDetails'}
              component={GroupDetailsScreen}
            />
            <Stack.Screen name={'CommentLikes'} component={CommentLikeScreen} />
            <Stack.Screen name={'Members'} component={MembersScreen} />
            <Stack.Screen name={'NewGroupScreen'} component={NewGroupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name={'Login'}>
              {props => (
                <LoginScreen {...props} loginCallBack={loginCallBack} />
              )}
            </Stack.Screen>
            <Stack.Screen name={'Register'}>
              {props => (
                <RegisterScreen {...props} loginCallBack={loginCallBack} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
};

export default App;
