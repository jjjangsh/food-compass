import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import userStore from '../zustand/userStore';

const PostDetailCard = ({ post, postId }) => {
  const navigate = useNavigate();
  const { user } = userStore();

  //포스트 삭제하기
  const deletePost = async () => {
    const confirm = window.confirm('게시글이 삭제됩니다. 삭제하시겠습니까?');
    if (confirm) {
      const response = await axios.delete(`http://localhost:4000/posts/${postId}`);
      navigate('/');
      return response;
    }
  };
  return (
    <>
      <div>{post.userId}</div>
      <div>{post.title}</div>
      <div>{post.postContent}</div>
      <div>{post.foodType}</div>
      <div>{post.address}</div>
      {user.userId === post.userId ? (
        <div>
          <button onClick={deletePost}>삭제하기</button>
          <button
            onClick={() => {
              navigate(`/postupdate?id=${postId}`);
            }}
          >
            수정하기
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostDetailCard;
