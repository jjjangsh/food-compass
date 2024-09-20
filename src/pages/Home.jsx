import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import YoutubeVideos from '../components/YoutubeVideos';

const Home = () => {
  const [localTab, setLocalTab] = useState('');
  const [currentTab, setTab] = useState('');
  const navigate = useNavigate();

  const localTabArr = ['전체', '서울', '부산', '인천', '경기', '제주도', '기타'];
  const foodTypeTabArr = ['전체', '한식', '일식', '중식', '양식', '디저트'];

  // 포스트 가져와서 보여주기
  const { data, isPending, isError } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:4000/posts');
      return response.data.reverse();
    }
  });

  if (isPending) return <div>가져오는 중</div>;
  if (isError) return <div>오류</div>;

  // 탭으로 post 데이터 필터링하기
  let postsData = data;
  switch (localTab) {
    case '전체':
      postsData = data;
      break;
    case '서울':
      postsData = postsData.filter((n) => n.address.includes('서울'));
      break;
    case '부산':
      postsData = postsData.filter((n) => n.address.includes('부산'));
      break;
    case '인천':
      postsData = postsData.filter((n) => n.address.includes('인천'));
      break;
    case '경기':
      postsData = postsData.filter((n) => n.address.includes('경기'));
      break;
    case '제주도':
      postsData = postsData.filter((n) => n.address.includes('제주'));
      break;
    case '기타':
      postsData = postsData.filter((n) => {
        return (
          !n.address.includes('서울') &&
          !n.address.includes('부산') &&
          !n.address.includes('인천') &&
          !n.address.includes('경기') &&
          !n.address.includes('제주')
        );
      });
      break;
    default:
      postsData = data;
  }

  switch (currentTab) {
    case '전체':
      postsData = postsData.filter((n) => n);
      break;
    case '한식':
      postsData = postsData.filter((n) => n.foodType === '한식');
      break;
    case '일식':
      postsData = postsData.filter((n) => n.foodType === '일식');
      break;
    case '중식':
      postsData = postsData.filter((n) => n.foodType === '중식');
      break;
    case '양식':
      postsData = postsData.filter((n) => n.foodType === '양식');
      break;
    case '디저트':
      postsData = postsData.filter((n) => n.foodType === '디저트');
      break;
    default:
      postsData = postsData.filter((n) => n);
  }

  return (
    <>
      <div className="flex flex-col mt-20">
        <div className="w-full bg-[url('./assets/banner.jpg')] bg-center bg-cover h-60 flex justify-center items-center"></div>

        <div className="fixed bottom-2 right-1 flex flex-col gap-5 p-10 ml-2 mt-2 z-50">
          <div className="flex">
            <img
              src="https://cdn-icons-png.flaticon.com/512/18/18529.png"
              className="w-6 hover:cursor-pointer mr-2"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <p className="font-semibold text-[18px]">TOP</p>
          </div>

          <div className="flex">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2740/2740697.png"
              className="w-6 hover:cursor-pointer mr-2"
              onClick={() => navigate('/postwrite')}
            />
            <p className="font-semibold text-[18px]">글쓰기</p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-4 justify-center items-center mt-4">
          <div className="flex flex-col items-end w-full px-4 md:px-16 my-5">
            <div className="flex flex-row gap-5 relative top-[55px] right-[5px]">
              <select
                value={localTab}
                onChange={(e) => setLocalTab(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled hidden>
                  지역
                </option>
                {localTabArr.map((tab, index) => (
                  <option key={index} value={tab}>
                    {tab}
                  </option>
                ))}
              </select>
              <select
                value={currentTab}
                onChange={(e) => setTab(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled hidden>
                  음식
                </option>
                {foodTypeTabArr.map((tab, index) => (
                  <option key={index} value={tab}>
                    {tab}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* <YoutubeVideos localTab={localTab} currentTab={currentTab} /> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-8 px-4 md:px-16 py-10 justify-items-center">
            {postsData.length > 0 ? (
              postsData.map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col w-full max-w-sm border border-gray-300 bg-white shadow-md p-4 gap-3 justify-start items-center rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  onClick={() => navigate(`/postdetail?id=${post.id}`)}
                >
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="h-48 w-full object-cover rounded-xl" />
                  ) : (
                    <div className="h-48 w-full flex justify-center items-center bg-gray-200 rounded-xl">
                      이미지가 없음
                    </div>
                  )}
                  <div className="flex flex-col w-full text-center gap-2">
                    <p className="text-sm mb-4">{post.foodType}</p>
                    <p className="font-semibold text-lg text-gray-800">{post.title}</p>
                    <p className="text-sm text-gray-500">주소: {post.address}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">필터 결과가 없습니다</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
