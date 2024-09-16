const PostDetailCard = ({ post }) => {
  return (
    <>
      <div className="p-2">{post.userId}</div>
      <div className="border-[1px] rounded-md p-2 mb-2 mt-2">{post.title}</div>
      <div className="border-[1px] rounded-md p-2 mb-2">{post.postContent}</div>
      {/* <div>{post.foodType}</div> */}
      <div className="p-2">
        <span className="text-slate-400	mr-2">주소</span> {post.address}
      </div>
    </>
  );
};

export default PostDetailCard;
