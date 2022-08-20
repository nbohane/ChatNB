import axios from 'axios';
import {apiUrl} from '../components/config';

export const login = (email, password) => {
  let json = {
    email: email,
    password: password,
  };
  return axios.post(apiUrl + '/users/login', json);
};

export const register = (name, email, age, password) => {
  let json = {
    name: name,
    email: email,
    age: age,
    password: password,
    bio: '',
    image_url: '',
  };
  return axios.post(apiUrl + '/users', json);
};

export const getUserById = (userId, myId) => {
  return axios.get(apiUrl + '/users/' + userId + '/' + myId);
};

export const getUserPostsByUserId = userId => {
  return axios.get(apiUrl + '/posts/user/' + userId);
};

export const followUser = (beingFollowed, followerId) => {
  let json = {
    follower_id: followerId,
    being_followed: beingFollowed,
  };
  return axios.post(apiUrl + '/followers', json);
};
export const unfollowUser = (beingFollowed, followerId) => {
  return axios.delete(
    apiUrl + '/followers/' + beingFollowed + '/' + followerId,
  );
};
