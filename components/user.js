import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {appStyles, colors} from './config';
import {NbAvatar} from './nb-avatar';
export const User = ({user, navigation}): Node => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <NbAvatar uri={user.image_url} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserDetails', {userId: user.id});
          }}>
          <Text style={styles.author}> {user.name}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: appStyles.edgeMargin,
  },
  author: {
    fontSize: appStyles.primaryTextSize,
    fontWeight: 'bold',
    color: colors.dark,
    marginLeft: appStyles.elementSpacing,
  },
});
