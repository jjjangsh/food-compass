import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, getComments, updateComment } from './../api/comment';
import userStore from '../zustand/userStore';
import { useState } from 'react';

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
    <div className="border-2 border-gray-300 rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">댓글</h3>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="bg-white border border-gray-300 shadow-sm rounded-md p-3 mb-3">
            <div className="flex justify-between items-start">
              <span className="text-gray-800 font-medium">{user.nickname}</span>
              {user.userId === comment.userId && (
                <div className="flex space-x-2 text-sm">
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
            <p className="text-gray-700 mt-2">{comment.content}</p>

            {editingCommentId === comment.id && (
              <div className="mt-2">
                <form onSubmit={handleUpdateComment} className="flex items-center space-x-2">
                  <input
                    value={editedCommentContent}
                    onChange={(e) => setEditedCommentContent(e.target.value)}
                    placeholder="수정할 내용을 입력하세요."
                    className="flex-grow border border-gray-300 rounded-lg p-2"
                  />
                  <button type="submit" className="bg-sky-600 text-white px-2 py-2 rounded-lg hover:bg-sky-700">
                    수정 완료
                  </button>
                  <button
                    type="button"
                    className="bg-pink-600 text-white px-2 py-2 rounded-lg hover:bg-pink-700"
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

      <form onSubmit={handleAddComment} className="mt-6 flex space-x-4">
        <textarea
          name="comment"
          placeholder="댓글을 입력하세요."
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 resize-none"
          rows={1}
          style={{ height: '42px' }}
        />
        <button
          type="submit"
          className="bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
          style={{ height: '42px', width: '80px', padding: '0 8px', whiteSpace: 'nowrap' }}
        >
          댓글 작성
        </button>
      </form>
    </div>
  );
};

export default Comment;
