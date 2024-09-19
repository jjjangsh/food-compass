import { useState } from 'react';
import userStore from '../zustand/userStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, getComments, updateComment } from '../api/comment';

const Comment = ({ postId }) => {
  const { user } = userStore();
  const queryClient = useQueryClient();
  const [commentContent, setCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');

  const {
    data: comments,
    isLoading: isCommentLoading,
    isError: isCommentError
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId)
  });

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    }
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    }
  });

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
      setEditingCommentId(null);
    }
  });

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    addCommentMutation.mutate({
      postId: postId,
      userId: user.userId,
      content: commentContent
    });

    setCommentContent('');
  };

  const handleUpdateComment = (e) => {
    e.preventDefault();
    if (!editedCommentContent.trim()) return;

    updateCommentMutation.mutate({
      commentId: editingCommentId,
      content: editedCommentContent
    });
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent('');
  };

  if (isCommentLoading) return <div>댓글을 불러오는 중입니다...</div>;
  if (isCommentError) return <div>댓글을 불러오는 중 에러가 발생했습니다.</div>;

  return (
    <div>
      <h3>댓글</h3>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="py-2">
            <div className="flex justify-between items-start">
              <span className="text-gray-800">
                {user.nickname}: {comment.content}
              </span>
              {user.userId === comment.userId && (
                <div className="flex space-x-2">
                  <button
                    className="text-sky-600 hover:text-sky-800"
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditedCommentContent(comment.content);
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="text-pink-600 hover:text-pink-800"
                    onClick={() => deleteCommentMutation.mutate(comment.id)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>

            {editingCommentId === comment.id && (
              <div className="mt-2">
                <form onSubmit={handleUpdateComment} className="flex space-x-2">
                  <input
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                    placeholder="수정할 내용을 입력하세요."
                    className="flex-grow border border-gray-300 rounded p-2"
                  />
                  <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700">
                    수정 완료
                  </button>
                  <button
                    type="button"
                    className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                    onClick={handleCancelEdit}
                  >
                    취소
                  </button>
                </form>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>댓글이 없습니다.</div>
      )}

      <form onSubmit={handleAddComment} className="mt-4 flex space-x-2">
        <input
          name="comment"
          placeholder="댓글을 입력하세요."
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className="flex-grow border border-gray-300 rounded p-2"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">댓글 추가</button>
      </form>
    </div>
  );
};

export default Comment;
