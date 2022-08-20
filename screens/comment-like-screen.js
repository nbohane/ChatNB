import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getCommentLikesByCommentId} from '../utilities/likesApi';
import {User} from '../components/user';
import {colors} from '../components/config';

export const CommentLikeScreen = ({route}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getCommentLikes(route.params.commentId);
  }, [route.params]);

  const getCommentLikes = id => {
    getCommentLikesByCommentId(id)
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        styles={styles.flatList}
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
        renderItem={({item}) => <User user={item} />}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    color: colors.dark,
  },
  container: {
    flex: 1,
  },
});
