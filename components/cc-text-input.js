import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {appStyles, colors} from './config';
import Icon from 'react-native-vector-icons/Ionicons';

export const CCTextInput = ({
  placeholder,
  onChangeText,
  secureTextEntry,
  text,
  onPress,
  value,
  iconName,
  size,
  color,
}): Node => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize={'none'}
        style={styles.input}
        placeholderTextColor={'black'}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        value={value}
      />
      {iconName && (
        <TouchableOpacity onPress={onPress}>
          <Icon
            style={styles.buttonText}
            name={iconName}
            size={size}
            color={color}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: appStyles.cornerRadius,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: appStyles.elementSpacing,
    marginBottom: appStyles.elementSpacing,
    alignItems: 'center',
  },
  input: {
    color: 'black',
    flex: 1,
    paddingLeft: 16,
    fontSize: appStyles.primaryTextSize,
  },
  buttonText: {
    fontWeight: 'bold',
    color: colors.primary,
    textTransform: 'capitalize',
    paddingRight: 16,
    paddingLeft: 16,
  },
});
