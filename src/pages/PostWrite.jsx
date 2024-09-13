import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../api/post';
import PostForm from '../components/PostForm';

const PostWrite = () => {
  const queryClient = useQueryClient();

  // 게시글 작성
  const { mutate } = useMutation({
    mutationFn: (newPost) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const handleSubmit = (formData) => {
    mutate(formData);
  };

  return (
    <div className="flex w-full justify-center items-center h-[calc(100vh-100px)]">
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default PostWrite;
