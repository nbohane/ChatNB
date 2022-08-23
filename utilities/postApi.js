import axios from 'axios';
import {apiUrl} from '../components/config';

export const getPostsInFeed = userId => {
  return axios.get(apiUrl + '/posts/feed/' + userId);
};

export const newPost = (author, text, location) => {
  let json = {
    author: author,
    text: text,
    group_id: 0,
    location: location,
    // image_url: 'imageUrl',
    // profile_pic: 'profilePic',
  };
  return axios.post(apiUrl + '/posts', json);
};

export const likePost = (userId, postId) => {
  let json = {
    user_id: userId,
    post_id: postId,
  };
  return axios.post(apiUrl + '/postlikes', json);
};

export const unlikePost = (userId, postId) => {
  return axios.delete(apiUrl + '/postlikes/' + userId + '/' + postId);
};
