import axios from 'axios';
import {apiUrl} from '../components/config';

export const getPostLikesByPostId = postId => {
  return axios.get(apiUrl + '/users/postlikes/' + postId);
};

export const getCommentLikesByCommentId = commentId => {
  return axios.get(apiUrl + '/users/commentlikes/' + commentId);
};
