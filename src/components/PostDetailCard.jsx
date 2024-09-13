import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import userStore from '../zustand/userStore';

const PostDetailCard = () => {
  const navigate = useNavigate();
  const { user } = userStore();

  //포스트 아이디 가져오기(메인화면에서 선택하면 쿼리스트링으로)
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = searchParams.get('id'); // postId = 1

  //해당 포스트 가져와서 보여주기
  const {
    data: post,
    isError: isPostError,
    isPending: isPostPending
  } = useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:4000/posts?id=${postId}`);
      return response.data[0]; //질문
    }
  });

  if (isPostPending) return <div>포스트를 불러오고 있습니다 ...</div>;
  if (isPostError) return <div>에러가 발생했습니다 ...</div>;

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
      <div>{post.id}</div>
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
