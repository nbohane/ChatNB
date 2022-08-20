import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import {appStyles} from './config';

export const NbAvatar = ({uri}): Node => {
  return (
    <Image
      style={styles.image}
      source={{
        uri: uri,
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
