/*global kakao*/
import { useEffect } from 'react';
import { getPostLocation } from '../api/getmap';
import userStore from '../zustand/userStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostDetailMap = ({ post, postId }) => {
  const { user } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    var services = kakao.maps.services;
    if (!services) {
      console.log('kakao.maps.services 를 찾을 수 없음 :', kakao.maps);
      return;
    } else {
      getPostLocation(post);
    }
  }, []);

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
    <div>
      <div id="map" className="w-[1000px] h-[300px] bg-slate-50"></div>
      {user.userId === post.userId ? (
        <div className="text-right m-7">
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
