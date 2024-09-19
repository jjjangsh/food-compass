import commentInstance from "../axiosInstances/commentInstance";

// 댓글 가져오는 요청
export const getComments = async (postId) => {
  const response = await commentInstance.get('', {
    params: { postId }
  });
  return response.data;
}

// 댓글 작성 요청
export const addComment = async (newComment) => {
  const response = await commentInstance.post('', newComment);
  return response.data;
}

// 댓글 수정 요청
export const updateComment = async ({ commentId, content }) => {
  const response = await commentInstance.patch(`/${commentId}`, { content });
  return response.data;
}

// 댓글 삭제 요청
export const deleteComment = async (commentId) => {
  const response = commentInstance.delete(`/${commentId}`);
  return (await response).data;
}