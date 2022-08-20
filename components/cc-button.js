import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {appStyles, colors} from './config';

export const CCButton = ({text, onPress, outline}): Node => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        outline ? styles.outlineButton : styles.solidButton,
      ]}
      onPress={onPress}>
      <Text
        style={[styles.text, outline ? styles.outlineText : styles.solidText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: appStyles.cornerRadius,
    width: '100%',
    marginTop: appStyles.elementSpacing,
    marginBottom: appStyles.elementSpacing,
  },
  text: {
    textAlign: 'center',
    fontSize: appStyles.primaryTextSize,
  },
  outlineButton: {
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  solidButton: {
    backgroundColor: colors.primary,
  },
  outlineText: {
    color: colors.primary,
  },
  solidText: {
    color: colors.light,
  },
});
