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
import {getPostsInFeed} from '../utilities/postApi';
import {appStyles, colors} from '../components/config';
import {CCButton} from '../components/cc-button';
import {Post} from '../components/post';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FeedScreen = ({navigation}): Node => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    getPostsInFeed(userId)
      .then(response => {
        console.log(response.data.data);
        setPosts(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={posts}
        onRefresh={getPosts}
        refreshing={false}
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
      <View style={{paddingHorizontal: appStyles.edgeMargin, width: '100%'}}>
        <CCButton
          text={'New Post'}
          onPress={() => {
            navigation.navigate('NewPost');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
