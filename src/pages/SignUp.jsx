import axios from 'axios';
import { useState } from 'react';

const SignUp = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://moneyfulpublicpolicy.co.kr/register', { id, password, nickname });
      console.log(response); // {data:{{success:true, message: '가입완료'}} , ...}

      const data = response.data;
      if (data.success) {
        alert('signup successed');
      } else {
        alert('signup failed'); // 이부분은 서버에 요청하고 서버로부터 응답은 잘 받았지만 겹치는 닉네임이 있거나, 이미 가입된 유저면 data.success가 false로 뜨면서 로그인 실패 alert
      }
    } catch (error) {
      console.log('error', error);
      alert('signup failed');
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={id}
          placeholder="id"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="text"
          value={nickname}
          placeholder="nickname"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
