const PostDetailCard = ({ post }) => {
  const randomImg = [
    'src/assets/image1.png',
    'src/assets/image2.png',
    'src/assets/image3.png',
    'src/assets/image4.png',
    'src/assets/image5.png'
  ];
  const imageIndex = Math.floor(Math.random() * randomImg.length);
  const profileImage = randomImg[imageIndex];

  return (
    <div className="grid grid-cols-2 gap-4 justify-center border-2 border-gray-300 rounded-lg p-4 mt-20">
      <div className="w-[400px]">
        <div className="p-2 mb-2 font-mono text-slate-400 flex">
          <img src={profileImage} alt="profileImage" className="w-10 h-10 mr-4 rounded-full" />
          <span className="text-lg pt-2">{post.userId}</span>
        </div>
        <span className="font-bold m-2">제목</span>
        <div className="border-[1px] rounded-md border-gray-300 p-2 mb-4 mt-2">{post.title}</div>
        <span className="m-2 font-bold">내용</span>
        <div className="border-[1px] rounded-md border-gray-300 p-2 mb-2 mt-2 h-[200px]">{post.postContent}</div>
        <div className="p-2">
          <span className="text-slate-400	mr-2">주소</span> {post.address}
        </div>
      </div>
      <div className="w-[400px] ml-2 mt-20">
        <img src={post.image} alt="" className="w-[400px]" />
      </div>
    </div>
  );
};

export default PostDetailCard;
