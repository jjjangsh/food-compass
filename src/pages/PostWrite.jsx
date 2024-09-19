import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/post';
import PostForm from '../components/PostForm';
import { useNavigate } from 'react-router-dom';

const PostWrite = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 게시글 작성
  const { mutate } = useMutation({
    mutationFn: (newPost) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/');
      // console.log('게시글 작성 성공.');
    }
  });

  const handleWriteSubmit = (formData) => {
    mutate(formData);
    alert('게시물 작성이 완료되었습니다.');
  };

  return (
    <div className="flex flex-col w-full justify-center items-center min-h-[calc(100vh-80px)]">
      <PostForm onSubmit={handleWriteSubmit} />
    </div>
  );
};

export default PostWrite;
