import { useSearchParams } from 'react-router-dom';
import PostDetailCard from '../components/PostDetailCard';
import PostDetailMap from '../components/PostDetailMap';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Comment from '../components/Comment';

const PostDetail = () => {
  //포스트 아이디 가져오기
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

  return (
    <div className="m-auto mt-8">
      <PostDetailCard post={post} />
      <PostDetailMap post={post} postId={postId} />
    </div>
  );
};

export default PostDetail;
