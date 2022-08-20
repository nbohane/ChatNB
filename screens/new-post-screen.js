import type {Node} from 'react';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {newPost} from '../utilities/postApi';
import {colors} from '../components/config';
import {CCTextInput} from '../components/cc-text-input';
import {CCButton} from '../components/cc-button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NewPostScreen = ({navigation}): Node => {
  const [text, setText] = useState('');

  const createPost = async () => {
    console.log('text', text);
    const author = await AsyncStorage.getItem('user_id');
    newPost(author, text)
      .then(response => {
        console.log(response.data);
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>Create Post</Text>
      <CCTextInput
        placeholder={'caption'}
        onChangeText={value => setText(value)}
      />
      <CCButton text={'Create Post'} onPress={createPost} />
    </SafeAreaView>
  );
};
const margin = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
    padding: margin,
  },
  appTitle: {
    fontSize: 40,
    color: colors.primary,
    marginBottom: margin,
  },
});
