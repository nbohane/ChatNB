import {getAllGroups, getGroupsByUserId} from '../utilities/groupApi';
import {getPostsInFeed} from '../utilities/postApi';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Group} from '../components/group';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../components/config';

export const GroupsScreen = ({navigation}): Node => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    getGroupsByUserId(userId)
      .then(response => {
        setGroups(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={groups}
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
        renderItem={({item}) => <Group group={item} navigation={navigation} />}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flatList: {
    width: '100%',
  },
  container: {
    flex: 1,
  },
});
