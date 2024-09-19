const PostDetailCard = ({ post }) => {
  return (
    <div className="grid grid-cols-2 gap-4 justify-center">
      <div className="w-[400px]">
        <div className="p-2">{post.userId}</div>
        <div className="border-[1px] rounded-md p-2 mb-2 mt-2">{post.title}</div>
        <div className="border-[1px] rounded-md p-2 mb-2">{post.postContent}</div>
        <div className="p-2">
          <span className="text-slate-400	mr-2">주소</span> {post.address}
        </div>
      </div>
      <div className="w-[400px]">
        <img src={post.image} alt="" className="w-[400px]" />
      </div>
    </div>
  );
};

export default PostDetailCard;
