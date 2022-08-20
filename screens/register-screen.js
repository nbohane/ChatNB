import type {Node} from 'react';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {appStyles, colors} from '../components/config';
import {register} from '../utilities/userApi';
import {CCTextInput} from '../components/cc-text-input';
import {CCButton} from '../components/cc-button';

export const RegisterScreen = ({loginCallBack, navigation}): Node => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const attemptRegister = () => {
    console.log('name', name);
    console.log('email', email);
    console.log('age', age);
    console.log('password', password);
    register(name, email, age, password)
      .then(response => {
        console.log(response.data);
        let user = {
          id: response.data.insertId,
        };
        loginCallBack(user);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <CCTextInput placeholder={'name'} onChangeText={text => setName(text)} />
      <CCTextInput
        placeholder={'email'}
        onChangeText={text => setEmail(text)}
      />
      <CCTextInput placeholder={'age'} onChangeText={text => setAge(text)} />
      <CCTextInput
        secureTextEntry
        placeholder={'password'}
        onChangeText={text => setPassword(text)}
      />
      <CCTextInput
        secureTextEntry
        placeholder={'confirm password'}
        onChangeText={text => setConfirmPassword(text)}
      />
      <CCButton text={'Register'} onPress={attemptRegister} />
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? Log in </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.loginButton}>here</Text>
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
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: appStyles.elementSpacing,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: colors.primary,
    fontSize: appStyles.primaryTextSize,
  },
  loginButton: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
