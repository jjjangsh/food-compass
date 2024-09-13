import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createPost } from '../api/post';

const PostWrite = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    postContent: '',
    foodType: '',
    address: ''
  });
  const [submitTime, setSubmitTime] = useState(null);

  // formData에 userId추가

  // 폼 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const { mutate } = useMutation({
    mutationFn: (newPost) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts']
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    setSubmitTime(currentTime);
    console.log(submitTime);
    mutate(formData);
    console.log(formData);
    // formData 초기화
    setFormData({
      userId: '',
      title: '',
      postContent: '',
      foodType: '',
      address: ''
    });
  };

  console.log(formData);

  return (
    <div className="flex w-full justify-center my-auto">
      <form onSubmit={handleSubmit} className="flex flex-col w-60 gap-4">
        <p>닉네임: 짱구</p>
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
    </div>
  );
};

export default PostWrite;
