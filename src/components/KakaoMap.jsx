/* global kakao */
import { useEffect, useState } from "react";

const KakaoMap = () => {
  const [address, setAddress] = useState();
  const [myMap, setMyMap] = useState(null);
  console.log(address);
  console.log(myMap);

  useEffect(() => {
    const container = document.getElementById("map");

    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    setMyMap(map);
  }, []);
  return (
    <>
      <input
        onChange={(e) => setAddress(e.target.value)}
        placeholder="주소를 입력하세요"
      />
      <div id="map" className="w-3/4 h-60"></div>
    </>
  );
};

export default KakaoMap;
