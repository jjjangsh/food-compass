import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, getCommentCount, getComments, updateComment } from './../api/comment';
import userStore from '../zustand/userStore';
import { useState } from 'react';

const Comment = ({ postId }) => {
  const { user } = userStore();
  const queryClient = useQueryClient();
  const [commentContent, setCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');

  const [page, setPage] = useState(1);
  const limit = 5;

  // postId에 해당하는 댓글들 개수 가져오는 useQuery
  const {
    data: totalCommentsCount,
    isLoading: isCountLoading,
    isError: isCountError
  } = useQuery({
    queryKey: ['commentCount', postId],
    queryFn: () => getCommentCount(postId)
  });

  const totalPages = Math.max(1, Math.ceil(totalCommentsCount / limit));

  // postId에 해당하는 댓글들 페이지처리 해서 가져오는 useQuery
  const {
    data: comments,
    isLoading: isCommentLoading,
    isError: isCommentError
  } = useQuery({
    queryKey: ['comments', postId, page],
    queryFn: () => getComments(postId, page, limit)
  });

  // 댓글 작성 useMutation
  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comment', postId, page]);
      setPage(1);
    }
  });

  // 댓글 삭제 useMutation
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId, page]);
    }
  });

  // 댓글 수정 useMutation
  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
      setEditingCommentId(null);
    }
  });

  // 댓글 작성 함수
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    addCommentMutation.mutate({
      postId: postId,
      userId: user.userId,
      content: commentContent
    });

    setCommentContent('');
    setPage(1);
  };

  // 댓글 수정 함수
  const handleUpdateComment = (e) => {
    e.preventDefault();
    if (!editedCommentContent.trim()) return;

    updateCommentMutation.mutate({
      commentId: editingCommentId,
      content: editedCommentContent
    });
  };

  // 댓글 수정 모드 취소 함수
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent('');
  };

  if (isCommentLoading || isCountLoading) return <div>댓글을 불러오는 중입니다...</div>;
  if (isCommentError || isCountError) return <div>댓글을 불러오는 중 에러가 발생했습니다.</div>;

  return (
    <div className="border-2 border-gray-300 bg-gray-50 rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4">댓글</h3>
      {comments?.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="border bg-gray-100 border-gray-300 shadow-sm rounded-md p-3 mb-3">
            <div className="flex justify-between  items-start">
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

      <div className="flex justify-center mt-4">
        <button className="px-1" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          &lt;
        </button>
        <span>{`${page} / ${totalPages}`}</span>
        <button
          className="px-1"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          &gt;
        </button>
      </div>

      <form onSubmit={handleAddComment} className="mt-6 flex space-x-4">
        <textarea
          name="comment"
          placeholder="댓글을 입력하세요."
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          className="w-full border border-gray-300 bg-gray-100 rounded-lg p-2 resize-none"
          rows={1}
          style={{ height: '42px' }}
        />
        <button
          type="submit"
          className="bg-orange-500 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center"
          style={{ height: '42px', width: '80px', padding: '0 8px', whiteSpace: 'nowrap' }}
        >
          댓글 작성
        </button>
      </form>
    </div>
  );
};

export default Comment;
