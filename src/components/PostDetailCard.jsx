const PostDetailCard = ({ post }) => {
  return (
    <>
      <div>{post.userId}</div>
      <div>{post.title}</div>
      <div>{post.postContent}</div>
      <div>{post.foodType}</div>
      <div>{post.address}</div>
    </>
  );
};

export default PostDetailCard;
