import axios from 'axios';

const POST_URL = 'https://classy-puzzling-collision.glitch.me/posts';

// posts 데이터 가져오기
export const fetchPosts = async () => {
  const { data } = await axios.get(POST_URL);
  return data;
};

// 특정 게시글 데이터 가져오기
export const fetchSelectedPost = async (id) => {
  const { data } = await axios.get(`${POST_URL}/${id}`);
  return data;
};

// post 생성
export const createPost = async (formData) => {
  const { data } = await axios.post(POST_URL, formData);
  return data;
};

// post 수정
export const updatePost = async (id, editedPost) => {
  const { data } = await axios.patch(`${POST_URL}/${id}`, editedPost);
  return data;
};
