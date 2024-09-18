import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import KakaoMap from '../components/KakaoMap';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState();
  if (address) {
    console.log(address);
    console.log(address.La, address.Ma);
  }

  // 포스트 가져와서 보여주기
  const { data, isPending, isError } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:4000/posts');
      return response.data;
    }
  });
  if (isPending) return <div>가져오는 중</div>;
  if (isError) return <div>오류남</div>;
  return (
    <>
      <button className="fixed bottom-2 right-2 bg-sky-200 w-1/5 h-10" onClick={() => navigate('/postwrite')}>
        게시물 추가
      </button>
      <div className="flex flex-col w-full gap-4 justify-center items-center">
        <div className="flex flex-row gap-7">
          <button>전체</button>
          <button>한식</button>
          <button>일식</button>
          <button>중식</button>
          <button>양식</button>
          <button>디저트</button>
        </div>
        {/* <KakaoMap setAddress={setAddress} /> */}
        {data.map((post) => {
          return (
            <div
              key={post.id}
              className="flex flex-col bg-orange-100 w-3/5 p-3 gap-2 justify-center items-center rounded-xl"
              onClick={() => navigate(`/postdetail?id=${post.id}`)}
            >
              <div className="flex flex-row gap-5">
                <p>닉네임:{post.userId}</p>
                <p>제목:{post.title}</p>
              </div>
              <p>내용:{post.postContent}</p>
              <div className="flex flex-row gap-5">
                <p>카테고리:{post.foodType}</p>
                <p>주소:{post.address}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
