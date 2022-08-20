import axios from 'axios';
import {apiUrl} from '../components/config';

export const getAllParticipantsByUserId = userId => {
  return axios.get(apiUrl + '/participants/' + userId);
};
