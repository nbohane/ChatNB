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

export const Comment = ({comment, post, navigation}): Node => {
  const [likingComment, setLikingComment] = useState(comment.liked);
  const [numberOfLikes, setNumberOfLikes] = useState(comment.number_of_likes);

  let currentTime = new Date(comment.timestamp);
  let timestamp = moment(currentTime).fromNow();

  const commentLike = async () => {
    setNumberOfLikes(numberOfLikes + 1);
    setLikingComment(true);
    const author = await AsyncStorage.getItem('user_id');
    createCommentLike(author, comment.id)
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
        <NbAvatar uri={comment.profile_pic} />
        <View style={styles.messageContainer}>
          <View style={styles.heartContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserDetails', {userId: comment.user});
              }}>
              <Text style={styles.author}>{comment.author_name}</Text>
            </TouchableOpacity>
            <NbSpacer />

            <TouchableOpacity
              onPress={likingComment ? commentUnlike : commentLike}>
              <Icon
                name={likingComment ? 'heart' : 'ios-heart-outline'}
                size={28}
                color={likingComment ? colors.like : colors.dark}
              />
            </TouchableOpacity>
          </View>
          <View />
          <Text style={[styles.message, {marginTop: -8}]}>
            {comment.message}
          </Text>
          <View style={styles.timestampContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CommentLikes', {commentId: comment.id});
              }}>
              <Text style={styles.commentLikes}>
                {numberOfLikes} like
                {numberOfLikes === 1 ? '' : 's'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.timestamp}>{timestamp}</Text>
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
    marginTop: 1,
  },
  timestamp: {
    fontSize: appStyles.smallTextSize,
    color: colors.gray,
    paddingLeft: appStyles.elementSpacing,
  },
  heartContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  timestampContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  commentLikes: {
    color: colors.gray,
    fontSize: appStyles.smallTextSize,
  },
});
