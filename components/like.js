import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NbAvatar} from './nb-avatar';
import {NbSpacer} from './nb-spacer';
import Icon from 'react-native-vector-icons/Ionicons';
import {appStyles, colors} from './config';
import React from 'react';

export const Likes = ({post, navigation}): Node => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <NbAvatar uri={post.image_url} />
        <Text style={styles.author}>steve</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Likes', {postId: post.id});
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: appStyles.elementSpacing,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  author: {
    fontSize: appStyles.primaryTextSize,
    fontWeight: 'bold',
    color: colors.dark,
  },
});
