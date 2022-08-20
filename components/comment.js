import type {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {appStyles, colors} from './config';
import {NbAvatar} from './nb-avatar';
import {NbSpacer} from './nb-spacer';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createCommentLike, deleteCommentLike} from '../utilities/commentApi';
import {unlikePost} from '../utilities/postApi';

export const Comment = ({comment, navigation}): Node => {
  const [likingComment, setLikingComment] = useState(comment.liked);
  const [numberOfLikes, setNumberOfLikes] = useState(comment.number_of_likes);

  const commentLike = async () => {
    setNumberOfLikes(numberOfLikes + 1);
    setLikingComment(true);
    const userId = await AsyncStorage.getItem('user_id');
    createCommentLike(userId, comment.id)
      .then(response => {})
      .catch(error => {
        console.log(error);
        setNumberOfLikes(numberOfLikes - 1);
        setLikingComment(false);
      });
  };
  const commentUnlike = async () => {
    setNumberOfLikes(numberOfLikes - 1);
    setLikingComment(false);
    const userId = await AsyncStorage.getItem('user_id');
    deleteCommentLike(userId, comment.id)
      .then(response => {})
      .catch(error => {
        console.log(error);
        setNumberOfLikes(numberOfLikes + 1);
        setLikingComment(true);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <NbAvatar uri={'https://picsum.photos/id/1/200/300'} />
        <View style={styles.messageContainer}>
          <Text style={styles.author}>{comment.author_name}</Text>
          <View style={styles.heartContainer}>
            <Text style={styles.message}>{comment.message}</Text>
            <NbSpacer />
            <TouchableOpacity
              onPress={likingComment ? commentUnlike : commentLike}>
              <Icon
                name={likingComment ? 'heart' : 'ios-heart-outline'}
                size={28}
                color={colors.dark}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CommentLikes', {commentId: comment.id});
              }}>
              <Text style={styles.commentLikes}>
                {numberOfLikes} like
                {numberOfLikes === 1 ? '' : 's'}
              </Text>
            </TouchableOpacity>
            <NbSpacer />
            <Text style={styles.timestamp}>
              {moment(comment.timestamp).format('dddd, MMMM Do YYYY')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: appStyles.elementSpacing,
    paddingHorizontal: appStyles.edgeMargin,
    width: '100%',
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  messageContainer: {
    paddingLeft: appStyles.edgeMargin,
    flex: 1,
  },
  author: {
    fontSize: appStyles.primaryTextSize,
    fontWeight: 'bold',
    color: colors.dark,
  },
  message: {
    fontSize: appStyles.primaryTextSize,
    color: colors.dark,
  },
  timestamp: {
    fontSize: appStyles.smallTextSize,
    color: colors.dark,
  },
  heartContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  // timestampContainer: {
  //   display: 'flex',
  //   flex: 1,
  //   flexDirection: 'row',
  // },
  commentLikes: {
    color: colors.dark,
    fontSize: appStyles.smallTextSize,
  },
});
