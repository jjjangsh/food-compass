import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';

const YoutubeVideos = ({ localTab, currentTab }) => {
  const key = import.meta.env.VITE_YOUTUBE_API_KEY;

  let keyword = '';
  if (localTab === '전체' && currentTab === '전체') {
    keyword = '한국맛집';
  } else if (localTab === '전체' && currentTab !== '전체') {
    keyword = '한국' + currentTab + '맛집';
  } else if (localTab !== '전체' && currentTab === '전체') {
    keyword = localTab + '맛집';
  } else {
    keyword = localTab + currentTab + '맛집';
  }

  useEffect(() => {
    refetch();
  }, [keyword]);

  const {
    data: videoData,
    isPending,
    isError,
    refetch
  } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?
        part=snippet&maxResults=3&type=video&q=${keyword}&key=${key}`);
      return response.data.items;
    }
  });

  if (isPending) {
    return <div>로딩중입니다</div>;
  }
  if (isError) {
    return <div>에러 발생</div>;
  }

  const targetVideo = {
    id: 'ytplayer',
    type: 'text/html',
    width: '480',
    height: '270',
    frameBorder: '0',
    allowFullScreen: 'allowFullScreen'
  };

  return (
    <div className="">
      <div className=" w-8/12 bg-orange-200  text-2xl rounded-3xl flex flex-col mt-24 mb-3 mx-auto text-center justify-items-center p-3">
        <p>
          지역: {localTab || '전체'} & 음식: {currentTab || '전체'}
        </p>
        <p className="ml-6"> 맛집 추천 영상</p>
      </div>
      <div className="grid grid-cols-3 w-full mt-6  gap-12 mx-10 ">
        {videoData.map((video) => {
          return (
            <iframe
              {...targetVideo}
              key={video.id.videoId}
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
            ></iframe>
          );
        })}
      </div>
    </div>
  );
};

export default YoutubeVideos;
