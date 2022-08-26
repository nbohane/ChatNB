import React, {useEffect, useState} from 'react';
import {
  followUser,
  getUserById,
  getUserPostsByUserId,
  unfollowUser,
} from '../utilities/userApi';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {User} from '../components/user';
import {Post} from '../components/post';
import {appStyles, colors} from '../components/config';
import {CCButton} from '../components/cc-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {likePost} from '../utilities/postApi';

export const UserDetailsScreen = ({navigation, route}): Node => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [follower, setFollower] = useState(false);

  useEffect(() => {
    getUser(route.params.userId);
    getUsersPosts(route.params.userId);
  }, [route.params]);

  useEffect(() => {
    setFollower(user.following);
  }, [user]);

  const getUser = async id => {
    const myId = await AsyncStorage.getItem('user_id');
    getUserById(id, myId)
      .then(response => {
        console.log('user info', response.data);
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getUsersPosts = id => {
    getUserPostsByUserId(id)
      .then(response => {
        console.log('user posts', response.data.data);
        setPosts(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const startFollowing = async () => {
    setFollower(true);
    const userId = await AsyncStorage.getItem('user_id');
    followUser(user.id, userId)
      .then(response => {})
      .catch(error => {
        console.log(error);
        setFollower(false);
      });
  };
  const endFollowing = async () => {
    setFollower(false);
    const userId = await AsyncStorage.getItem('user_id');
    unfollowUser(user.id, userId)
      .then(response => {})
      .catch(error => {
        console.log(error);
        setFollower(true);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.name}> {user.name} </Text>
      <Text style={styles.bio}> {user.bio} </Text>
      <View style={styles.button}>
        <CCButton
          style={styles.button}
          text={follower ? 'unfollow' : 'follow'}
          outline={follower}
          onPress={follower ? endFollowing : startFollowing}
        />
      </View>
      <FlatList
        style={styles.flatList}
        data={posts}
        renderItem={({item}) => <Post post={item} navigation={navigation} />}
        ItemSeparatorComponent={() => (
          <View
            style={{
              marginTop: 8,
              marginBottom: 4,
              height: 1,
              backgroundColor: colors.separator,
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flatList: {
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: appStyles.primaryTextSize,
    fontWeight: 'bold',
    color: colors.dark,
    padding: appStyles.elementSpacing,
  },
  bio: {
    fontSize: appStyles.primaryTextSize,
    color: colors.dark,
    paddingBottom: appStyles.elementSpacing,
  },
  button: {
    paddingHorizontal: appStyles.edgeMargin,
    width: '100%',
  },
});
