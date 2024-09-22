import axios from 'axios';

const commentInstance = axios.create({
  baseURL: 'https://classy-puzzling-collision.glitch.me/comments'
});

export default commentInstance;
