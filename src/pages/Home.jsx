import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import _ from "lodash";

const Home = () => {
  const queryClient = useQueryClient();
  const [localTab, setLocalTab] = useState("전체");
  const [currentTab, setTab] = useState("전체");
  const navigate = useNavigate();
  const { ref, inView } = useInView({ threshold: 1 });
  const localTabArr = [
    "전체",
    "서울",
    "부산",
    "인천",
    "경기",
    "제주도",
    "기타",
  ];
  const foodTypeTabArr = ["전체", "한식", "일식", "중식", "양식", "디저트"];

  // 포스트 가져와서 보여주기
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["post"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `http://localhost:4000/posts?location=${
          localTab === "전체" ? "" : localTab
        }&foodType=${
          currentTab === "전체" ? "" : currentTab
        }&_page=${pageParam}&_per_page=12`
      );
      // 최신순으로 정렬
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data.next !== null) {
        return lastPage.data.next;
      }
      return undefined;
    },
  });

  // 탭 누르면 post 정보 유효성 초기화해서 다시 불러오기
  useEffect(() => {
    queryClient.invalidateQueries(["post"]);
  }, [queryClient, localTab, currentTab]);

  // 무한 스크롤
  useEffect(() => {
    const handleNextPostsLoading = _.throttle(() => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    }, 5000);
    handleNextPostsLoading(inView);
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <div>불러오는중</div>;
  if (isError) return <div>에러남</div>;

  return (
    <>
      <div className="fixed bottom-3 right-3 flex flex-col gap-5">
        <img
          src="https://cdn-icons-png.flaticon.com/512/18/18529.png"
          className="w-20 hover:cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/2740/2740697.png"
          className="w-20 hover:cursor-pointer"
          onClick={() => navigate("/postwrite")}
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
                  className={localTab === tab ? "focusTabBtn" : "blurTabBtn"}
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
                  className={currentTab === tab ? "focusTabBtn" : "blurTabBtn"}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
        <div id="mainList" className="grid grid-cols-3 w-full gap-5 px-28">
          {data.pages.map((page) => {
            return page.data.data.map((post) => {
              return (
                <div
                  key={post.id}
                  className="flex flex-col bg-sky-50 p-3 gap-2 justify-center items-center rounded-xl hover:cursor-pointer"
                  onClick={() => navigate(`/postdetail?id=${post.id}`)}
                >
                  {post.image ? (
                    <img src={post.image} alt={post.title} />
                  ) : (
                    <div>이미지가 없음</div>
                  )}
                  <p>{post.title}</p>
                  <p>{post.address}</p>
                </div>
              );
            });
          })}
        </div>
        <div ref={ref}>마지막</div>
      </div>
    </>
  );
};

export default Home;
