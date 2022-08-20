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

export const Group = ({group, navigation}): Node => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <NbAvatar uri={'https://picsum.photos/id/1/200/300'} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('GroupDetails', {groupId: group.id});
            }}>
            <Text style={styles.author}> {group.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: appStyles.elementSpacing,
    display: 'flex',
    flex: 1,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    fontSize: appStyles.primaryTextSize,
    fontWeight: 'bold',
    color: colors.dark,
  },
});
