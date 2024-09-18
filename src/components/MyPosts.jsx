import axios from 'axios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import userStore from '../zustand/userStore';
import PostDetailMap from './PostDetailMap';

const MyPosts = () => {
  const { user } = userStore((state) => {
    return state;
  });
  console.log(user);
  const {
    data: myPosts,
    isPending,
    isError
  } = useQuery({
    queryKey: ['myPosts'],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:4000/posts?userId=${user.userId}`);
      return response.data;
    }
  });

  if (isPending) {
    return <div>로딩중..</div>;
  }
  if (isError) {
    return <div> 에러다..</div>;
  }

  return (
    <>
      <div>내가 작성한 게시물</div>
      {myPosts.map((myPost) => {
        return (
          <div key={myPost.id} className="grid grid-cols-2 gap-8 m-auto justify-center border-[3px]">
            <div className="w-[500px] mt-5 ">
              <div className="p-2">{myPost.userId}</div>
              <div className="border-[1px] rounded-md p-2 mb-2 mt-2">{myPost.title}</div>
              <div className="border-[1px] rounded-md p-2 mb-2">{myPost.postContent}</div>
              <div className="border-[1px] rounded-md p-2 mb-2 mt-2 ">{myPost.foodType}</div>
              <div className="p-2">
                <span className="text-slate-400	mr-2">주소</span> {myPost.address}
              </div>
            </div>
            <div className="w-[450px] mt-5 ">
              {/* 테스트를 위한 사진 */}
              <img
                src="https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230310_261%2F1678382014767ulavE_JPEG%2FMochuislefrenchcafe_f_%25281%2529.jpg"
                alt=""
              />
            </div>
            <div className="col-span-2">
              <PostDetailMap post={myPost} postId={myPost.postId} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MyPosts;
