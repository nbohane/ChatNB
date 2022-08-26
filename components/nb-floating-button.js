import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {appStyles, colors} from './config';

export const NbFloatingButton = ({onPress, name}): Node => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon style={styles.icon} name={name} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    color: colors.light,
    backgroundColor: colors.primary,
    height: 54,
    width: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 34,
  },
});
