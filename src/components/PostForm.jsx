import { useEffect, useRef, useState } from 'react';
import userStore from '../zustand/userStore';
import KakaoMap from './KakaoMap';

const PostForm = ({ onSubmit, isEditing, initialData }) => {
  const fileInputRef = useRef(null);
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

  // initialData가 있을 때 폼 데이터와 이미지 미리보기 설정
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    }
  }, [initialData]);

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

    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (formData.title.length > 25) {
      alert('제목은 최대 25자까지 입력할 수 있습니다.');
      return;
    }
    if (!formData.postContent.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    if (!formData.foodType) {
      alert('카테고리를 선택해주세요.');
      return;
    }
    if (!formData.address.trim()) {
      alert('주소를 입력해주세요.');
      return;
    }

    console.log('게시 버튼 누르고 formData', formData);

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
    // 파일 인풋 필드 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // 파일 입력 필드 초기화
    }
  };

  // KakaoMap에서 받은 주소를 formData에 저장
  const handleAddressChange = (newAddress) => {
    setFormData((prev) => ({
      ...prev,
      address: newAddress
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-full max-w-[500px] max-h-[calc(100vh-80px)] gap-3 p-3 pt-0"
    >
      <div className="px-2 pb-2 flex flex-col items-center gap-2 min-w-96 border border-l-stone-300 rounded-md">
        {imagePreview ? (
          <>
            <img src={imagePreview} className="w-full h-full object-contain rounded-md max-w-full max-h-[250px] mt-3" />
            <input
              type="file"
              accept="image/*"
              name="image"
              className="mt-2 w-[280px]"
              onChange={handleChange}
              ref={fileInputRef}
            />
          </>
        ) : (
          <>
            <p>사진을 업로드해주세요</p>
            <input
              type="file"
              accept="image/*"
              name="image"
              className="mt-2 w-[280px]"
              onChange={handleChange}
              ref={fileInputRef}
            />
          </>
        )}
        {<p className="w-[280px]">닉네임: {user?.nickname}</p>}
        <p>
          제목 :
          <input
            onChange={handleChange}
            className="ml-2 border border-black w-[230px] outline-none"
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
            className="ml-2 border border-black w-[230px] outline-none"
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
            className="ml-2 border border-black w-[203px] outline-none"
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
      </div>
      <div className="w-full">
        <div className="flex flex-col items-center gap-2 justify-center">
          <KakaoMap address={formData.address} setAddress={handleAddressChange} className="w-full" />
          <button
            type="submit"
            className="bg-sky-200 text-black w-[350px] h-8 rounded-lg shadow-lg transition-opacity duration-300 hover:opacity-80"
          >
            {isEditing ? '수정' : '게시'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
