import commentInstance from "../axiosInstances/commentInstance";

// 페이징처리 댓글 가져오는 요청
export const getComments = async (postId, page, limit) => {
  const response = await commentInstance.get('', {
    params: {
      postId,
      _page: page,
      _per_page: limit
    }
  });
  return response.data.data;
}

// 특정 postId의 댓글 수만 가져오는 API
export const getCommentCount = async (postId) => {
  const response = await commentInstance.get('', {
    params: { postId }
  });
  return response.data.length;
};

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