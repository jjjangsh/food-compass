import axios from 'axios';

const POST_URL = 'http://localhost:3000/posts';

// posts 데이터 가져오기
export const fetchPosts = async () => {
  const { data } = await axios.get(POST_URL);
  return data;
};

// post 생성
export const createPost = async (formData) => {
  const { data } = await axios.post(POST_URL, formData);
  return data;
};
