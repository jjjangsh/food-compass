import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PostDetailCard = () => {
  //포스트 아이디 가져오기(메인화면에서 선택하면 쿼리스트링으로)
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  // console.log('postId ===>', postId); //1

  //해당 포스트 내용 json-server에서 가져오기
  const {
    data: post,
    isError: isPostError,
    isPending: isPostPending
  } = useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:4000/posts?id=${postId}`);
      return response.data[0];
    }
  });
  console.log('post', post);

  if (isPostPending) {
    return <div>포스트를 불러오고 있습니다 ...</div>;
  }
  if (isPostError) {
    return <div>에러가 발생했습니다 ...</div>;
  }

  //포스트 삭제하기
  const deletePost = () => {
    console.log();
  };
  return (
    <>
      <div>{post.id}</div>
      <div>{post.userId}</div>
      <div>{post.title}</div>
      <div>{post.postContent}</div>
      <div>{post.foodType}</div>
      <div>{post.address}</div>
      <button onClick={deletePost}>삭제하기</button>
    </>
  );
};

export default PostDetailCard;
