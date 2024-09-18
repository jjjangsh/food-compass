import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [currentTab, setTab] = useState("전체");
  const navigate = useNavigate();

  // 포스트 가져와서 보여주기
  const { data, isPending, isError } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:4000/posts");
      // 최신순으로 정렬
      return response.data.reverse();
    },
  });
  if (isPending) return <div>가져오는 중</div>;
  if (isError) return <div>오류남</div>;

  // 탭으로 post 데이터 필터링하기
  let postsData = data;
  switch (currentTab) {
    case "전체":
      postsData = data;
      break;
    case "한식":
      postsData = data.filter((n) => n.foodType === "한식");
      break;
    case "일식":
      postsData = data.filter((n) => n.foodType === "일식");
      break;
    case "중식":
      postsData = data.filter((n) => n.foodType === "중식");
      break;
    case "양식":
      postsData = data.filter((n) => n.foodType === "양식");
      break;
    case "카페":
      postsData = data.filter((n) => n.foodType === "카페");
      break;
    default:
      postsData = data;
  }

  return (
    <>
      <button
        className="fixed bottom-2 right-2 bg-sky-200 w-1/5 h-10"
        onClick={() => navigate("/postwrite")}
      >
        게시물 추가
      </button>
      <div className="flex flex-col w-full gap-4 justify-center items-center">
        <div className="flex flex-row gap-7">
          <button>전체</button>
          <button>서울</button>
          <button>부산</button>
          <button>인천</button>
          <button>대구</button>
          <button>제주도</button>
        </div>
        <div className="flex flex-row gap-7">
          <button onClick={() => setTab("전체")}>전체</button>
          <button onClick={() => setTab("한식")}>한식</button>
          <button onClick={() => setTab("일식")}>일식</button>
          <button onClick={() => setTab("중식")}>중식</button>
          <button onClick={() => setTab("양식")}>양식</button>
          <button onClick={() => setTab("카페")}>카페</button>
        </div>
        {postsData.map((post) => {
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
