import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createMember,
  deleteMember,
  getGroupById,
  getMembersByGroupId,
  getPostsByGroupId,
} from '../utilities/groupApi';
import {User} from '../components/user';
import {Post} from '../components/post';
import {MembersScreen} from './members-screen';
import {appStyles, colors} from '../components/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CCButton} from '../components/cc-button';

export const GroupDetailsScreen = ({navigation, route}): Node => {
  const [posts, setPosts] = useState([]);
  const [group, setGroup] = useState({});

  useEffect(() => {
    getGroup(route.params.groupId);
    getPostsByGroup(route.params.groupId);
  }, [route.params]);

  const getGroup = async id => {
    const userId = await AsyncStorage.getItem('user_id');
    getGroupById(id, userId)
      .then(response => {
        console.log(response.data);
        setGroup(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getPostsByGroup = id => {
    getPostsByGroupId(id)
      .then(response => {
        setPosts(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const joinGroup = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    createMember(userId, group.id)
      .then(response => {
        getGroup(group.id);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const leaveGroup = () => {
    deleteMember(group.member_id)
      .then(response => {
        getGroup(group.id);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.name}> {group.name} </Text>
      <Text style={styles.text}> {group.bio} </Text>
      {group.member_id ? (
        <CCButton text={'Leave Group'} outline onPress={leaveGroup} />
      ) : (
        <CCButton text={'Join Group'} onPress={joinGroup} />
      )}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Members', {groupId: group.id});
        }}>
        <Text style={styles.text}> 20 Members </Text>
      </TouchableOpacity>
      <FlatList
        style={styles.flatList}
        data={posts}
        renderItem={({item}) => <Post post={item} navigation={navigation} />}
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
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flatList: {
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: appStyles.primaryTextSize,
    fontWeight: 'bold',
    color: colors.dark,
    padding: appStyles.elementSpacing,
  },
  text: {
    fontSize: appStyles.primaryTextSize,
    color: colors.dark,
    paddingBottom: appStyles.elementSpacing,
  },
});
