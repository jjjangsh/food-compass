import { useEffect, useState } from 'react';
import userStore from '../zustand/userStore';

const PostForm = ({ onSubmit }) => {
  const { user } = userStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    postContent: '',
    foodType: '',
    address: '',
    image: ''
  });

  // userId 업데이트
  useEffect(() => {
    if (user && user.userId) {
      setFormData((prev) => ({
        ...prev,
        userId: user.userId
      }));
    }
  }, [user]);

  // 폼 입력 핸들러
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // 이미지 처리
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      // FileReader 생성
      const reader = new FileReader();
      // FileReader가 파일을 읽게함
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imgUrl = reader.result;
        setImagePreview(imgUrl);
        setFormData((prev) => ({
          ...prev,
          image: imgUrl
        }));
      };
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // 초기화
    setFormData({
      userId: '',
      title: '',
      postContent: '',
      foodType: '',
      address: '',
      image: ''
    });
    setImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-60 gap-2">
      <div>
        {imagePreview && <img src={imagePreview} className="min-w-[240px] max-h-[400px]" alt="업로드 미리보기" />}
      </div>
      <input type="file" accept="image/*" name="image" onChange={handleChange} />
      {<p>닉네임: {user?.nickname}</p>}
      <p>
        제목 :
        <input
          onChange={handleChange}
          className="ml-2 border border-black"
          type="text"
          name="title"
          placeholder="제목"
          value={formData.title}
        />
      </p>
      <p>
        내용 :
        <input
          onChange={handleChange}
          className="ml-2 border border-black"
          type="text"
          name="postContent"
          placeholder="내용"
          value={formData.postContent}
        />
      </p>
      <p>
        카테고리:
        <select
          onChange={handleChange}
          className="ml-2 border border-black min-w-[150px]"
          name="foodType"
          value={formData.foodType}
        >
          <option value="">선택</option>
          <option value="한식">한식</option>
          <option value="중식">중식</option>
          <option value="일식">일식</option>
          <option value="양식">양식</option>
          <option value="디저트">디저트</option>
        </select>
      </p>
      <p>
        주소 :
        <input
          onChange={handleChange}
          className="ml-2 border border-black"
          type="text"
          name="address"
          placeholder="서울시"
          value={formData.address}
        />
      </p>
      <button>게시</button>
    </form>
  );
};

export default PostForm;
