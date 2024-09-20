/* global kakao */
import { useEffect, useState } from 'react';

const KakaoMap = ({ address, setAddress }) => {
  const [searchResult, setSearchResult] = useState('제주특별자치도 제주시 첨단로 242');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // 지도 생성하기
    // 지도를 생성할 곳 지정하기
    const container = document.getElementById('map');
    // 지도 옵션 결정하기 -지도 중심과 축척
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    // 지도 생성하기
    const map = new kakao.maps.Map(container, options);
    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new kakao.maps.services.Geocoder();
    // 장소 검색 객체를 생성합니다
    let ps = new kakao.maps.services.Places();
    // 좌표로 주소 검색- 자세하게
    const serchDetailAddFromCoords = (coords, callback) => {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    };

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    const placesSearchCB = (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    };

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(searchResult, placesSearchCB);
    // 검색결과 마커
    const displayMarker = (place) => {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        // 마커를 클릭하면 주소가져가기
        setAddress(place.address_name);
      });
    };

    // 지도에 마커찍기
    // 지도 중심에 마커 만들기
    const marker = new kakao.maps.Marker({
      position: map.getCenter()
    });
    //마커 찍기
    marker.setMap(map);

    // 클릭으로 마커 이동하기 + 마커 찍은 곳 정보 가져가기
    kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
      // 지도에서 클릭한 위치의 정보 가져오기
      let latIng = mouseEvent.latLng;
      // 문자 주소 도출-자세하게
      serchDetailAddFromCoords(latIng, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let detailAddress = result[0].address.address_name;
          setAddress(detailAddress);
        }
      });
      // 클릭한 위치로 마커 이동하기
      marker.setPosition(latIng);
    });
  }, [searchResult]);

  return (
    <>
      <form className="flex gap-3 h-10">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="text-gray-500 border-2 border-orange-200 rounded-md w-[355px] px-3 py-2 outline-none focus:border-orange-400"
          placeholder="주소를 입력하세요"
        />
        <button
          className="border border-orange-300 bg-orange-500 text-white w-16 p-1 rounded-md transition-colors duration-500 hover:bg-orange-600"
          onClick={(e) => {
            e.preventDefault();
            setSearchResult(search);
          }}
        >
          검색
        </button>
      </form>
      {address ? (
        <p className="text-orange-500 w-full ml-10 underline underline-offset-8">현재 주소 : {address}</p>
      ) : (
        <p className="text-orange-500 w-full ml-10 underline underline-offset-8">
          주소를 검색하고 마커를 클릭해주세요! {address}
        </p>
      )}

      <div id="map" className="w-full h-60"></div>
    </>
  );
};

export default KakaoMap;
