/*global kakao*/
import userStore from '../zustand/userStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CustomOverlayMap, Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';

const PostDetailMap = ({ post, postId }) => {
  const { user } = userStore();
  const navigate = useNavigate();
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [isOpen, setIsOpen] = useState(false);

  const create = async () => {
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 가게 주소
    const address = post.address;
    // Promise로 감싸서 비동기 처리
    const coords = await new Promise((resolve, reject) => {
      // 주소로 좌표를 검색
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          resolve(coords); // 좌표 반환
        } else {
          reject(new Error('주소 검색 실패'));
        }
      });
    });
    return coords;
  };

  // async/await로 호출
  const getCenter = async () => {
    try {
      const coords = await create(); // create()의 결과를 기다림
      setCoords({ lat: coords.getLat(), lng: coords.getLng() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCenter();
  }, [post.address]);

  //포스트 삭제하기
  const deletePost = async () => {
    const confirm = window.confirm('게시글이 삭제됩니다. 삭제하시겠습니까?');
    if (confirm) {
      const response = await axios.delete(`http://localhost:4000/posts/${postId}`);
      navigate('/');
      return response;
    }
  };

  return (
    <div className="mt-4 mb-8 ">
      <Map center={{ lat: coords.lat, lng: coords.lng }} style={{ width: '816px', height: '300px' }} level={2}>
        <MapTypeControl position={'TOPRIGHT'} />
        <ZoomControl />
        <MapMarker position={{ lat: coords.lat, lng: coords.lng }} onClick={() => setIsOpen(true)}></MapMarker>
        {isOpen && (
          <CustomOverlayMap position={{ lat: coords.lat, lng: coords.lng }}>
            <div className="w-[288px] bg-white pb-2">
              <div className="info">
                <div className="pt-[5px] pb-[10px] h-[30px] bg-transparent border-b-2 text-base font-bold pl-2">
                  #{post.foodType}
                  <div
                    className="absolute top-[5px] right-[10px] text-sm"
                    onClick={() => setIsOpen(false)}
                    title="닫기"
                  >
                    X
                  </div>
                </div>
                <div className="body">
                  <div className="m-2">
                    <img src={post.image} width="73" height="70" alt="식당이름" />
                  </div>
                  <div>
                    <span className="text-xs m-2">주소 :</span>
                    <span className="text-xs text-slate-500">{post.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </CustomOverlayMap>
        )}
      </Map>
      {user.userId === post.userId ? (
        <div className="text-right m-4">
          <button
            onClick={() => {
              navigate(`/postupdate?id=${postId}`);
            }}
            className=" detailBtn"
          >
            수정하기
          </button>
          <button onClick={deletePost} className=" detailBtn">
            삭제하기
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostDetailMap;
