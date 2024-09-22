import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Banner from '../components/Banner';
// import YoutubeVideos from "../components/YoutubeVideos";

const Home = () => {
  const queryClient = useQueryClient();
  const [localTab, setLocalTab] = useState('전체');
  const [currentTab, setTab] = useState('전체');
  const navigate = useNavigate();
  const { ref, inView } = useInView({ threshold: 1 });
  const localTabArr = ['전체', '서울', '부산', '인천', '경기', '제주도', '기타'];
  const foodTypeTabArr = ['전체', '한식', '일식', '중식', '양식', '디저트'];

  // 필터링에 따라 포스트 가져오기
  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['post'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
<<<<<<< HEAD
        `https://classy-puzzling-collision.glitch.me/posts?${
          localTab === "전체" ? null : "location=" + localTab + "&"
        }${
          currentTab === "전체" ? null : "foodType=" + currentTab + "&"
=======
        `https://classy-puzzling-collision.glitch.me/posts?${localTab === '전체' ? '' : 'location=' + localTab + '&'}${
          currentTab === '전체' ? '' : 'foodType=' + currentTab + '&'
>>>>>>> 707250dea355348d2d08c5835f60073fa6ad48f2
        }_page=${pageParam}&_per_page=12`
      );
      // 최신순으로 정렬
      return response.data;
    },
    // 다음 페이지 있는지 확인
    getNextPageParam: (lastPage) => {
      if (lastPage.next !== null) {
        return lastPage.next;
      }
      return undefined;
    }
  });

  // 탭 누르면 post 정보 유효성 초기화해서 다시 불러오기
  useEffect(() => {
    queryClient.invalidateQueries(['post']);
  }, [queryClient, localTab, currentTab]);

  // 무한 스크롤
  useEffect(() => {
    if (!inView || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [inView]);

  if (isPending) return <div>불러오는중</div>;
  if (isError) return <div>에러남</div>;

  return (
    <>
      <div className=" flex-col mt-20">
        <Banner />
        <div className="fixed bottom-2 right-1 flex flex-col gap-5 p-10 ml-2 mt-2 z-50">
          <div
            className="flex hover:cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/18/18529.png" className="w-6 mr-2" />
            <p className="font-semibold text-[18px]">TOP</p>
          </div>

          <div className="flex hover:cursor-pointer" onClick={() => navigate('/postwrite')}>
            <img src="https://cdn-icons-png.flaticon.com/512/2740/2740697.png" className="w-6 mr-2" />
            <p className="font-semibold text-[18px]">글쓰기</p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-4 justify-center items-center mt-4">
          <div className="flex flex-col items-end w-full px-4 md:px-16 my-5">
            <div className="flex flex-row gap-5 relative top-[55px] right-[35px] mb-4">
              <select
                value={localTab}
                onChange={(e) => setLocalTab(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled hidden>
                  지역
                </option>
                {localTabArr.map((tab) => (
                  <option key={tab} value={tab}>
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
                {foodTypeTabArr.map((tab) => (
                  <option key={tab} value={tab}>
                    {tab}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* <YoutubeVideos localTab={localTab} currentTab={currentTab} /> */}
        <div className=" w-8/12 bg-orange-200  text-2xl rounded-3xl flex flex-col mt-24 mb-3 mx-auto text-center justify-items-center p-3">
          게시물
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-8 px-4 md:px-16 py-10 justify-items-center">
          {data.pages.map((page) => {
            return page?.data?.map((post) => {
              return (
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
              );
            });
          })}
        </div>
        <div ref={ref} className="flex justify-center bg-orange-500 text-white text-2xl p-3">
          끝이에요
        </div>
      </div>
    </>
  );
};

export default Home;
