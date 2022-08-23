import type {Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {appStyles, colors} from '../components/config';
import {login} from '../utilities/userApi';
import {CCButton} from '../components/cc-button';
import {CCTextInput} from '../components/cc-text-input';

export const LoginScreen = ({loginCallBack, navigation}): Node => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const attemptLogin = () => {
    if (email === '' || password === '') {
      setError('All fields are required');
      return;
    }
    login(email, password)
      .then(response => {
        loginCallBack(response.data);
      })
      .catch(error => {
        setError(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>Chit Chat</Text>
      <CCTextInput
        placeholder={'email'}
        onChangeText={text => setEmail(text)}
      />
      <CCTextInput
        secureTextEntry
        placeholder={'password'}
        onChangeText={text => setPassword(text)}
      />
      {error != '' && (
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'crimson'}}>{error}</Text>
          <TouchableOpacity
            onPress={() => {
              setError('');
            }}>
            <Text style={{color: 'crimson', fontWeight: 'bold'}}> Dismiss</Text>
          </TouchableOpacity>
        </View>
      )}

      <CCButton text={'Login'} onPress={attemptLogin} />
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? Sign up </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.signUpButton}>here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
    padding: appStyles.edgeMargin,
  },
  signUpContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: appStyles.elementSpacing,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    color: colors.primary,
    fontSize: appStyles.primaryTextSize,
  },
  signUpButton: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  appTitle: {
    fontSize: appStyles.headingTextSize,
    color: colors.primary,
    marginBottom: appStyles.edgeMargin,
    fontVariant: ['small-caps'],
    fontWeight: 'normal',
  },
});
