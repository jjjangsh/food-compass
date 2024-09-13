import { useState } from 'react';
import { AuthenticatedStore } from '../zustand/store';
import axios from 'axios';

const MyPage = () => {
  const [newNickname, setNewNickname] = useState('');
  const { user, setUser } = AuthenticatedStore((state) => {
    return state;
  });

  const changeNicknameHandler = async (e) => {
    e.preventDefault();

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
        console.log(data);
        setUser(data); // 이 처리를 해야만 바뀐 user을 쓸 수 있음
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
    <div>
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
  );
};

export default MyPage;
