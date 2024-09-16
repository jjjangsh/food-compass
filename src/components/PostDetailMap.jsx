/*global kakao*/
import { useEffect } from 'react';
import { getPostLocation } from '../api/getmap';

const PostDetailMap = ({ post }) => {
  useEffect(() => {
    var services = kakao.maps.services;
    if (!services) {
      console.log('kakao.maps.services 를 찾을 수 없음 :', kakao.maps);
      return;
    } else {
      getPostLocation(post);
    }
  }, []);

  return <div id="map" className="w-[500px] h-[400px] bg-slate-50"></div>;
};

export default PostDetailMap;
