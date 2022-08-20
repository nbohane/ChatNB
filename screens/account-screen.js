import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CCButton} from '../components/cc-button';
import {appStyles, colors} from '../components/config';

export const AccountScreen = ({logOutCallBack}): Node => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CCButton outline text={'Log Out'} onPress={logOutCallBack} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: appStyles.edgeMargin,
  },
});
