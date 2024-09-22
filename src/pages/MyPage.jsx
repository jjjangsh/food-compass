import { useEffect, useState } from 'react';

import axios from 'axios';
import userStore from '../zustand/userStore';
import MyPosts from '../components/MyPosts';
import { useRef } from 'react';

const MyPage = () => {
  const [newNickname, setNewNickname] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const { user, setUser } = userStore((state) => {
    return state;
  });

  const changeNicknameHandler = async (e) => {
    e.preventDefault();

    if (user.nickname === newNickname) {
      alert('이전 닉네임과 같습니다. 다른 닉네임을 사용해주세요');
      return setNewNickname('');
    }

    if (newNickname === '') {
      return alert('입력된 닉네임이 없습니다.');
    }

    try {
      const { data } = await axios.patch(
        'https://moneyfulpublicpolicy.co.kr/profile',

        { nickname: newNickname },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        }
      );

      if (data.success) {
        alert('닉네임 변경 성공');
        const newUser = { ...user, nickname: data.nickname };
        setUser(newUser);
        setNewNickname('');
      } else {
        alert('닉네임 변경 실패');
        setNewNickname('');
      }
    } catch (error) {
      alert('닉네임 변경 실패');
      console.log('error', error);
    }
  };

  const profileImgsArr = [
    'src/assets/image1.png',
    'src/assets/image2.png',
    'src/assets/image3.png',
    'src/assets/image4.png',
    'src/assets/image5.png'
  ];
  const randomIndex = Math.floor(Math.random() * profileImgsArr.length);

  const nicknameRef = useRef('');
  useEffect(() => {
    nicknameRef.current.focus();
    setProfileImg(profileImgsArr[randomIndex]);
  }, []);
  return (
    <div>
      <div
        className=" w-8/12 bg-orange-200  text-2xl rounded-3xl flex flex-col mt-36
       mb-6 mx-auto text-center justify-items-center p-3"
      >
        내 프로필
      </div>
      <div className=" flex flex-col  rounded-lg justify-center items-center w-80 h-96 m-auto bg-amber-500">
        <img className="w-52 h-52 " src={profileImg} />
        <h5 className="p-3 text-xl">닉네임: {user.nickname} </h5>
        <form className="gap-6" onSubmit={changeNicknameHandler}>
          <label>닉네임 수정 : </label>
          <input
            ref={nicknameRef}
            type="text"
            value={newNickname}
            placeholder="새 닉네임"
            onChange={(e) => {
              setNewNickname(e.target.value);
            }}
          />

          <div className="mt-4  p-1 rounded-lg  hover:bg-blue-900 hover:text-white bg-orange-200 flex justify-center">
            <button className="hover:cursor-pointer">수정</button>
          </div>
        </form>
      </div>

      <MyPosts />
    </div>
  );
};

export default MyPage;
