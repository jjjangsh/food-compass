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

  console.log('useEffect 밖');

  const nicknameRef = useRef('');
  useEffect(() => {
    nicknameRef.current.focus();
    setProfileImg(profileImgsArr[randomIndex]);
    console.log('useEffect 안');
  }, []);
  return (
    <div>
      <div className="  h-16 flex items-center justify-center text-2xl mt-10 mb-3">내 프로필</div>
      <div className=" flex flex-col  rounded-lg justify-center items-center w-80 h-96 m-auto bg-sky-200">
        <img className="w-52 h-52 " src={profileImg} />
        <h5 className="p-3">닉네임: {user.nickname} </h5>
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
          <div className=" hover:cursor-pointer m-4 p-1 rounded-lg bg-fuchsia-200 flex justify-center">
            <button>수정</button>
          </div>
        </form>
      </div>
      <MyPosts />
    </div>
  );
};

export default MyPage;
