import axios from 'axios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import userStore from '../zustand/userStore';

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
          <div key={myPost.id} className="bg-slate-200 ">
            <h3>{myPost.title}</h3>
            <p>{myPost.foodType}</p>
            <p>{myPost.address}</p>
          </div>
        );
      })}
    </>
  );
};

export default MyPosts;
