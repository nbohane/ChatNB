import axios from 'axios';
import {apiUrl} from '../components/config';

export const getAllCommentsFromPost = (postId, userId) => {
  return axios.get(apiUrl + '/comments/post/' + postId + '/' + userId);
};

export const createComment = (message, post_id) => {
  let json = {
    message: message,
    sender: 1,
    post_id: post_id,
    timestamp: new Date(),
  };
  return axios.post(apiUrl + '/comments', json);
};

export const createCommentLike = (user_id, comment_id) => {
  let json = {
    user_id: user_id,
    comment_id: comment_id,
  };
  return axios.post(apiUrl + '/commentlikes', json);
};

export const deleteCommentLike = (user_id, comment_id) => {
  return axios.delete(apiUrl + '/commentlikes' + user_id + '/' + comment_id);
};
