import {apiUrl} from '../components/config';
import axios from 'axios';

export const getMembersByGroupId = groupId => {
  return axios.get(apiUrl + '/users/group/' + groupId);
};

export const getGroupById = (groupId, myId) => {
  return axios.get(apiUrl + '/groups/' + groupId + '/' + myId);
};

export const newGroup = name => {
  let json = {
    name: name,
    description: '',
  };
  return axios.post(apiUrl + '/groups' + json);
};

export const getPostsByGroupId = groupId => {
  return axios.get(apiUrl + '/posts/group/' + groupId);
};

export const getGroupsByUserId = userId => {
  return axios.get(apiUrl + '/groups/user/' + userId);
};
export const createMember = (userId, groupId) => {
  let json = {
    user_id: userId,
    group_id: groupId,
    is_admin: false,
  };
  return axios.post(apiUrl + '/members', json);
};

export const deleteMember = memberId => {
  return axios.delete(apiUrl + '/members/' + memberId);
};
