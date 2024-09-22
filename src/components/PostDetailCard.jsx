const PostDetailCard = ({ post }) => {
  const randomImg = [
    '/assets/image1.png',
    '/assets/image2.png',
    '/assets/image3.png',
    '/assets/image4.png',
    '/assets/image5.png'
  ];
  const imageIndex = Math.floor(Math.random() * randomImg.length);
  const profileImage = randomImg[imageIndex];

  return (
    <div className="grid grid-cols-2 gap-4 justify-center border-2 border-gray-300 rounded-lg p-4 mt-20 pb-6">
      <div className="w-[400px]">
        <div className="p-2 mb-2 font-mono text-slate-400 flex">
          <img src={profileImage} alt="profileImage" className="w-10 h-10 mr-4 rounded-full" />
          <span className="detailSpan text-black">{post.userId}</span>
        </div>
        <span className="detailSpan">제목</span>
        <div className="detailContent mb-4 ">{post.title}</div>
        <span className="detailSpan">내용</span>
        <div className="detailContent mb-2 h-[200px]">{post.postContent}</div>
        <span className="detailSpan">주소</span>
        <div className="detailContent">{post.address}</div>
      </div>
      <div className="w-[400px] ml-2 mt-20">
        <img src={post.image} alt="" className="w-[400px]" />
      </div>
    </div>
  );
};

export default PostDetailCard;
