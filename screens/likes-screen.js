import React from 'react';
import {
  getCommentLikesByCommentId,
  getPostLikesByPostId,
} from '../utilities/likesApi';
import {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Comment} from '../components/comment';
import {User} from '../components/user';
import {appStyles, colors} from '../components/config';

export const LikesScreen = ({navigation, route}): Node => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getPostLikes(route.params.postId);
  }, [route.params]);

  const getPostLikes = id => {
    getPostLikesByPostId(id)
      .then(response => {
        console.log(response.data.data);
        setUsers(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={users}
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
        renderItem={({item}) => <User user={item} navigation={navigation} />}
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
