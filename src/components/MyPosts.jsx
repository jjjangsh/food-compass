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
      <div className=" border-solid border-black  h-16 flex items-center justify-center text-2xl mt-16 mb-5">
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
              className="flex flex-col bg-sky-50 p-3 gap-2 justify-center items-center rounded-xl hover:cursor-pointer"
            >
              {myPost.image ? <img src={myPost.image} alt={myPost.tite} /> : <img src="src/assets/image.png" />}

              <div>{myPost.title}</div>
              <div>
                <span>주소</span> {myPost.address}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyPosts;
