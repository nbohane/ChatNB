import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {getAllParticipantsByUserId} from '../utilities/conversationApi';

export const ConversationsScreen = (): Node => {
  const getParticipants = () => {
    getAllParticipantsByUserId(2)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <SafeAreaView>
      <Text>Conversation Screen</Text>
    </SafeAreaView>
  );
};
