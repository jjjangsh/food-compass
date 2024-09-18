/*global kakao*/

// 지도 가져와서 주소로 장소 표시하기
export const getPostLocation = (post) => {
  //SECTION - 지도 가져오기
  const container = document.getElementById('map');
  const options = {
    //지도를 생성할때 필요한 기본 옵션
    //지도의 중심좌표
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3 //지도의 레벨(확대, 축소 정도)
  };
  //지도 생성 및 객체 리턴
  var map = new kakao.maps.Map(container, options);

  //SECTION - 주소로 장소 표시하기
  // 주소-좌표 변환 객체를 생성
  var geocoder = new kakao.maps.services.Geocoder();
  // 가게 주소
  const address = post.address;
  // 주소로 좌표를 검색
  geocoder.addressSearch(address, function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 결과값으로 받은 위치를 마커로 표시
      var marker = new kakao.maps.Marker({
        map: map,
        position: coords
      });
      // 지도의 중심을 결과값으로 받은 위치로 이동시키기
      map.setCenter(coords);

      // 인포윈도우로 장소에 대한 설명을 표시
      // var infowindow = new kakao.maps.InfoWindow({
      //   content: `<div style="width:150px;text-align:center;padding:6px 0;">${post.title}</div>`
      // });
      // infowindow.open(map, marker);
    }
  });
  //SECTION - 지도에 사용자 컨트롤 올리기
  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
  var mapTypeControl = new kakao.maps.MapTypeControl();
  // 지도에 컨트롤을 추가해야 지도위에 표시
  // kakao.maps.ControlPosition : 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
  // 지도 확대 축소를 제어할 수 있는  줌 컨트롤 생성
  var zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
};
