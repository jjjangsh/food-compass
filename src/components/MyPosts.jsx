import axios from 'axios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import userStore from '../zustand/userStore';
import PostDetailMap from './PostDetailMap';
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {
  const navigate = useNavigate();
  const { user } = userStore((state) => {
    return state;
  });

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
          <div
            onClick={() => {
              navigate(`/postdetail?id=${myPost.id}`);
            }}
            key={myPost.id}
            className="cursor-pointer grid grid-cols-2 gap-8 m-auto justify-center border-[3px]"
          >
            <div className="w-[500px] mt-5 ">
              <div className="p-2">{myPost.userId}</div>
              <div className="border-[1px] rounded-md p-2 mb-2 mt-2">{myPost.title}</div>
              <div className="border-[1px] rounded-md p-2 mb-2">{myPost.postContent}</div>
              <div className="border-[1px] rounded-md p-2 mb-2 mt-2 ">{myPost.foodType}</div>
              <div className="p-2">
                <span className="text-slate-400	mr-2">주소</span> {myPost.address}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MyPosts;
