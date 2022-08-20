import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {User} from '../components/user';
import React, {useEffect, useState} from 'react';
import {Member} from '../components/member';
import {getMembersByGroupId} from '../utilities/groupApi';
import {colors} from '../components/config';

export const MembersScreen = ({navigation, route}) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembersByGroup(route.params.groupId);
  }, [route.params]);

  const getMembersByGroup = id => {
    getMembersByGroupId(id)
      .then(response => {
        setMembers(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={members}
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
        renderItem={({item}) => <Member user={item} navigation={navigation} />}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
