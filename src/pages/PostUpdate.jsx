import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PostForm from '../components/PostForm';
import { fetchSelectedPost, updatePost } from '../api/post';
import { useLocation, useNavigate } from 'react-router-dom';

const PostUpdate = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get('id');
  // console.log('postId? ', postId);

  const { data: initialData } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => fetchSelectedPost(postId)
  });

  const { mutate } = useMutation({
    mutationFn: (newFormData) => updatePost(postId, newFormData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts']
      });
    }
  });

  const handleUpdateSubmit = (formData) => {
    mutate(formData);
    alert('게시글 수정이 완료되었습니다');
    navigate(`/postdetail?id=${postId}`);
  };
  return (
    <div className="flex w-full justify-center items-center h-full">
      <PostForm isEditing initialData={initialData} onSubmit={handleUpdateSubmit} />
    </div>
  );
};

export default PostUpdate;
