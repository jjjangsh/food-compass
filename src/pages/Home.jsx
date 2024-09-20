import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import YoutubeVideos from '../components/YoutubeVideos';

const Home = () => {
  const [localTab, setLocalTab] = useState('전체');
  const [currentTab, setTab] = useState('전체');
  const navigate = useNavigate();

  const localTabArr = ['전체', '서울', '부산', '인천', '경기', '제주도', '기타'];

  const foodTypeTabArr = ['전체', '한식', '일식', '중식', '양식', '디저트'];

  // 포스트 가져와서 보여주기
  const { data, isPending, isError } = useQuery({
    queryKey: ['post'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:4000/posts');
      // 최신순으로 정렬
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
      <div className="fixed bottom-3 right-3 flex flex-col gap-5">
        <img
          src="https://cdn-icons-png.flaticon.com/512/18/18529.png"
          className="w-20 hover:cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/2740/2740697.png"
          className="w-20 hover:cursor-pointer"
          onClick={() => navigate('/postwrite')}
        />
      </div>
      <div className="flex flex-col w-full gap-4 justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4 bg-sky-500 p-5 rounded-xl">
          <div className="flex flex-row gap-7">
            {localTabArr.map((tab, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setLocalTab(tab)}
                  className={localTab === tab ? 'focusTabBtn' : 'blurTabBtn'}
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <div className="flex flex-row gap-7">
            {foodTypeTabArr.map((tab, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setTab(tab)}
                  className={currentTab === tab ? 'focusTabBtn' : 'blurTabBtn'}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
        <YoutubeVideos localTab={localTab} currentTab={currentTab} />
        <div className="grid grid-cols-3 w-full gap-5 px-28">
          {postsData.length > 0 ? (
            postsData.map((post) => {
              return (
                <div
                  key={post.id}
                  className="flex flex-col bg-sky-50 p-3 gap-2 justify-center items-center rounded-xl hover:cursor-pointer"
                  onClick={() => navigate(`/postdetail?id=${post.id}`)}
                >
                  {post.image ? <img src={post.image} alt={post.title} /> : <div>이미지가 없음</div>}
                  <p>{post.title}</p>
                  <p>{post.address}</p>
                </div>
              );
            })
          ) : (
            <div>필터 결과가 없습니다</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
