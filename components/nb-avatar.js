import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import {appStyles} from './config';

export const NbAvatar = ({uri}): Node => {
  return (
    <Image
      style={styles.image}
      source={{
        uri: uri
          ? uri
          : 'https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg',
      }}
    />
  );
};
const styles = StyleSheet.create({
  image: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
