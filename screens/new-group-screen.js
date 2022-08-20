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
import {newGroup} from '../utilities/groupApi';

export const NewGroupScreen = ({navigation}): Node => {
  const [name, setName] = useState({});
  const createGroup = () => {
    console.log('name', name);
    newGroup(name)
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
      <Text style={styles.appTitle}>Create Group</Text>
      <CCTextInput
        placeholder={'name'}
        onChangeText={value => setName(value)}
      />
      <CCTextInput placeholder={'description'} />
      <CCButton text={'Create Group'} onPress={createGroup} />
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
