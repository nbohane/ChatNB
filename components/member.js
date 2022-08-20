import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {appStyles, colors} from './config';
import {NbAvatar} from './nb-avatar';

export const Member = ({user, navigation}): Node => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <NbAvatar uri={'https://picsum.photos/id/1/200/300'} />
          <View style={styles.messageContainer}>
            <Text style={styles.text}>isAdmin: {user.is_admin}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserDetails', {userId: user.id});
              }}>
              <Text style={styles.text}>{user.name}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    padding: appStyles.elementSpacing,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: appStyles.primaryTextSize,
    color: colors.dark,
    paddingLeft: appStyles.elementSpacing,
  },
});
