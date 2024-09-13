import { useEffect } from 'react';

const PostDetailMap = () => {
  const apiKey = import.meta.env.VITE_MAP_API_KEY;
  useEffect(() => {
    // 스크립트 태그 생성
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`; // autoload=false를 사용해 자동 로드 방지
    document.head.appendChild(mapScript);

    // 스크립트 로드가 완료된 후 실행
    mapScript.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };
        const map = new window.kakao.maps.Map(container, options);
      });
    };
  }, []);

  return (
    <div id="map" className="w-[500px] h-[400px] bg-slate-50">
      지도담을영역
    </div>
  );
};

export default PostDetailMap;
