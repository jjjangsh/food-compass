import { useState } from 'react';

import axios from 'axios';
import userStore from '../zustand/userStore';
import MyPosts from '../components/MyPosts';

const MyPage = () => {
  const [newNickname, setNewNickname] = useState('');
  const { user, setUser } = userStore((state) => {
    return state;
  });
  console.log(user);

  const changeNicknameHandler = async (e) => {
    e.preventDefault();

    if (user.nickname === newNickname) {
      return alert('같은 닉네임 입니다');
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
        console.log(user);
        // return문에서 바로 data.nickname을 보여주면 안되냐? 안된다 접근 불가다 이 data는 해당 스코프내에서만 사용 가능
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
  return (
    <div
      className="my-0 mx-auto leading-8 bg-red-200 p-8
"
    >
      <div className="flex item-center flex-col bg-blue-200">
        <img style={{ width: '100px' }} src="src/img/image.png" />
        <h5>닉네임: {user.nickname} </h5>
        <form onSubmit={changeNicknameHandler}>
          <label>닉네임 수정: </label>
          <input
            type="text"
            value={newNickname}
            placeholder="새 닉네임"
            onChange={(e) => {
              setNewNickname(e.target.value);
            }}
          />
          <button>수정</button>
        </form>
      </div>
      <MyPosts />
    </div>
  );
};

export default MyPage;
