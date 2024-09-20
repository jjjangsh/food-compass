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
      <div className=" w-8/12 bg-orange-200  text-2xl rounded-3xl flex flex-col mt-24 mb-8 mx-auto text-center justify-items-center p-3">
        내가 작성한 게시물
      </div>

      <div className="grid grid-cols-4 w-full gap-5 px-28">
        {myPosts.map((myPost) => {
          return (
            <div
              onClick={() => {
                navigate(`/postdetail?id=${myPost.id}`);
              }}
              key={myPost.id}
              className="flex flex-col w-full max-w-sm border border-gray-300 bg-white shadow-md p-4 gap-3 justify-start items-center rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              {myPost.image ? (
                <img src={myPost.image} alt={myPost.tite} className="h-48 w-full object-cover rounded-xl" />
              ) : (
                <img src="src/assets/image.png" className="h-48 w-full object-cover rounded-xl" />
              )}

              <div className="flex flex-col w-full text-center gap-2">
                <p className="text-sm mb-4">{myPost.foodType}</p>
                <p className="font-semibold text-lg text-gray-800">{myPost.title}</p>
                <p className="text-sm text-gray-500">주소: {myPost.address}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyPosts;
