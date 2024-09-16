/* global kakao */
import { useEffect, useState } from "react";

const KakaoMap = ({ setAddress }) => {
  const [searchResult, setSearchResult] = useState(
    "제주특별자치도 제주시 첨단로 242"
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    // 지도 생성하기
    // 지도를 생성할 곳 지정하기
    const container = document.getElementById("map");
    // 지도 옵션 결정하기 -지도 중심과 축척
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    // 지도 생성하기
    const map = new kakao.maps.Map(container, options);

    // 지도에 마커찍기
    // 지도 중심에 마커 만들기
    const marker = new kakao.maps.Marker({
      position: map.getCenter(),
    });
    //마커 찍기
    marker.setMap(map);

    // 클릭으로 마커 이동하기
    kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      // 지도에서 클릭한 위치의 정보 가져오기
      let latIng = mouseEvent.latLng;
      setAddress(latIng);
      // 클릭한 위치로 마커 이동하기
      marker.setPosition(latIng);
    });

    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(searchResult, (result, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setAddress(coords);
        // 검색 결과를 마커로 찍기
        marker.setPosition(coords);
        // 지도의 중심을 검색 결과로 이동
        map.setCenter(coords);
      }
    });
  }, [searchResult]);

  return (
    <>
      <form>
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="주소를 입력하세요"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setSearchResult(search);
          }}
        >
          검색
        </button>
      </form>
      <div id="map" className="w-3/4 h-60"></div>
    </>
  );
};

export default KakaoMap;
