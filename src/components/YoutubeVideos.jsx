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
    <div>
      <p>YoutubeVideos</p>
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
  );
};

export default YoutubeVideos;
