import { useEffect, useRef, useState } from 'react';
import userStore from '../zustand/userStore';
import KakaoMap from './KakaoMap';

const PostForm = ({ onSubmit, isEditing, initialData }) => {
  const fileInputRef = useRef(null);
  const { user } = userStore();
  const defaultImageUrl =
    'https://velog.velcdn.com/images/bsjaehee94/post/924c4319-a5c3-457e-a0d5-6e4804d7e26b/image.png';
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    postContent: '',
    foodType: '',
    address: '',
    image: '',
    location: ''
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

  const cityName = (address) => {
    const part = address.split(' ');
    return part[0];
  };

  // KakaoMap에서 받은 주소를 formData에 저장
  const handleAddressChange = (newAddress) => {
    const city = cityName(newAddress);
    setFormData((prev) => ({
      ...prev,
      address: newAddress,
      location: city
    }));
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
    const imageToSubmit = formData.image || defaultImageUrl;
    onSubmit({ ...formData, image: imageToSubmit });

    // 초기화
    setFormData({
      userId: '',
      title: '',
      postContent: '',
      foodType: '',
      address: '',
      image: '',
      location: ''
    });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex justify-center items-center w-full max-w-[800px] mt-24">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-full max-w-[500px] gap-4 p-4 border border-gray-300 rounded-lg"
      >
        <div className="pb-4 w-full flex flex-col items-center gap-5 rounded-md p-4">
          {imagePreview ? (
            <div className="w-full flex flex-col items-center gap-3">
              <img
                src={imagePreview}
                alt="preview"
                className="rounded-lg w-full h-[255px] max-h-[350px] object-cover"
              />
              <input
                type="file"
                accept="image/*"
                name="image"
                className="mt-3 max-w-xs w-full mr-auto"
                onChange={handleChange}
                ref={fileInputRef}
              />
            </div>
          ) : (
            <div className="w-full text-center">
              <img
                src={defaultImageUrl}
                alt="default"
                className="w-[450px] h-[255px] object-cover rounded-lg mx-auto"
              />
              <p className="text-xs mt-2 text-gray-600">사진을 업로드해주세요</p>
              <input
                type="file"
                accept="image/*"
                name="image"
                className="mt-2 w-full cursor-pointer text-gray-600"
                onChange={handleChange}
                ref={fileInputRef}
              />
            </div>
          )}
          <div className="w-full">
            <label className="block mb-1">제목</label>
            <input
              onChange={handleChange}
              className="text-gray-500 border-2 border-gray-200 rounded-md w-full px-3 py-2 outline-none focus:border-orange-400 font-light"
              type="text"
              name="title"
              placeholder="제목을 입력하세요"
              value={formData.title}
            />
          </div>

          <div className="w-full">
            <label className="block mb-1">내용</label>
            <textarea
              onChange={handleChange}
              className="text-gray-500 border-2 border-gray-200 rounded-md w-full px-3 py-2 outline-none resize-none focus:border-orange-400 font-light"
              name="postContent"
              placeholder="내용을 입력하세요"
              value={formData.postContent}
              rows="4"
            />
          </div>

          <div className="w-full">
            <label className="block mb-1">카테고리</label>
            <select
              onChange={handleChange}
              className="font-light border-2 border-gray-200 rounded-md w-full px-3 py-2 outline-none focus:border-orange-400 text-gray-500"
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
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-5 mt-2">
          <KakaoMap className="w-full" address={formData.address} setAddress={handleAddressChange} />
        </div>
        <button
          type="submit"
          className="font-light bg-orange-500 text-white w-full py-2 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-500"
        >
          {isEditing ? '수정' : '게시'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
