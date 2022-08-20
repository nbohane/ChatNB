import type {Node} from 'react';
import {getPostsInFeed} from '../utilities/postApi';
import {createComment, getAllCommentsFromPost} from '../utilities/commentApi';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CCButton} from '../components/cc-button';
import React, {useEffect, useState} from 'react';
import {CCTextInput} from '../components/cc-text-input';
import {Post} from '../components/post';
import {Comment} from '../components/comment';
import {appStyles, colors} from '../components/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CommentFeedScreen = ({navigation, route}): Node => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    getComments(route.params.postId);
    setPostId(route.params.postId);
  }, [route.params]);

  const getComments = async id => {
    const userId = await AsyncStorage.getItem('user_id');
    getAllCommentsFromPost(id, userId)
      .then(response => {
        console.log(response.data.data);
        setComments(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const sendComment = () => {
    createComment(message, postId)
      .then(response => {
        setMessage('');
        getComments(postId);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={comments}
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
        renderItem={({item}) => (
          <Comment navigation={navigation} comment={item} />
        )}
      />
      <View style={styles.createComment}>
        <CCTextInput
          placeholder={'write comment here...'}
          onChangeText={text => setMessage(text)}
          iconName={'arrow-up-circle'}
          size={24}
          color={colors.dark}
          onPress={sendComment}
          value={message}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  createComment: {
    padding: 8,
    paddingHorizontal: appStyles.edgeMargin,
    width: '100%',
  },
});
