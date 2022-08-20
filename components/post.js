import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {appStyles, colors} from './config';
import Icon from 'react-native-vector-icons/Ionicons';
import AutoHeightImage from 'react-native-auto-height-image';
import {NbAvatar} from './nb-avatar';
import {NbSpacer} from './nb-spacer';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {likePost, unlikePost} from '../utilities/postApi';

export const Post = ({post, navigation}): Node => {
  const [likingPost, setLikingPost] = useState(post.liked);
  const [numberOfLikes, setNumberOfLikes] = useState(post.number_of_likes);

  let currentTime = new Date(post.timestamp);
  let timestamp = moment(currentTime).fromNow();

  const postLike = async () => {
    setNumberOfLikes(numberOfLikes + 1);
    setLikingPost(true);
    const userId = await AsyncStorage.getItem('user_id');
    likePost(userId, post.id) // console.log(post.timestamp);
      // console.log(po)

      .then(response => {})
      .catch(error => {
        console.log(error);
        setNumberOfLikes(numberOfLikes - 1);
        setLikingPost(false);
      });
  };

  const postUnlike = async () => {
    setNumberOfLikes(numberOfLikes - 1);
    setLikingPost(false);
    const userId = await AsyncStorage.getItem('user_id');
    unlikePost(userId, post.id)
      .then(response => {})
      .catch(error => {
        console.log(error);
        setNumberOfLikes(numberOfLikes + 1);
        setLikingPost(true);
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingLeft: appStyles.edgeMargin,
          paddingTop: appStyles.elementSpacing,
        }}>
        <NbAvatar uri={post.profile_pic} />
      </View>
      <View style={{flex: 1}}>
        <View style={styles.topPanel}>
          <View style={styles.authorContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserDetails', {userId: post.author});
              }}>
              <Text style={[styles.text, {fontWeight: 'bold'}]}>
                {post.author_name}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.smallText, {marginTop: -4}]}>
              {post.location}
            </Text>
          </View>
          <TouchableOpacity onPress={likingPost ? postUnlike : postLike}>
            <Icon
              name={likingPost ? 'heart' : 'ios-heart-outline'}
              size={28}
              color={likingPost ? colors.like : colors.dark}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: appStyles.edgeMargin}}>
          <View style={styles.caption}>
            <Text style={styles.text}>{post.text}</Text>
          </View>
          <View style={styles.middlePanel}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Likes', {postId: post.id});
              }}>
              <Text style={styles.text}>
                {numberOfLikes} like
                {numberOfLikes === 1 ? '' : 's'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Comments', {postId: post.id});
              }}>
              <Text
                style={[styles.text, {paddingLeft: appStyles.elementSpacing}]}>
                {post.number_of_comments} comment
                {post.number_of_comments === 1 ? '' : 's'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timestampPanel}>
            <Text style={styles.smallText}>{timestamp}</Text>
            <NbSpacer />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('GroupDetails', {groupId: post.group_id});
              }}>
              <Text style={styles.smallText}> {post.group_name} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  topPanel: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: appStyles.edgeMargin,
    paddingVertical: appStyles.elementSpacing,
    paddingLeft: appStyles.elementSpacing,
  },
  authorContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: appStyles.edgeMargin,
    paddingLeft: appStyles.elementSpacing,
  },
  middlePanel: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: appStyles.elementSpacing,
  },
  caption: {
    flexDirection: 'row',
    width: '100%',
  },
  text: {
    fontSize: appStyles.primaryTextSize,
    color: colors.dark,
  },
  smallText: {
    fontSize: appStyles.smallTextSize,
    color: colors.dark,
  },
  timestampPanel: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: appStyles.elementSpacing,
  },
});
