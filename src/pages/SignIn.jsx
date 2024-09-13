import { useState } from 'react';
import { AuthenticatedStore } from '../zustand/store';
import axios from 'axios';

const SignIn = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = AuthenticatedStore((state) => {
    return state;
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://moneyfulpublicpolicy.co.kr/login', {
        id,
        password
      });

      const data = response.data;
      if (data.success) {
        alert('로그인 성공');
        setUser(data);
        setId('');
        setPassword('');
      } else alert('로그인실패');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    alert('로그아웃완료');
    setId('');
    setPassword('');
  };

  return (
    <div>
      <form onSubmit={loginHandler}>
        <h1>로그인페이지</h1>
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
        <button>로그인</button>
        <button type="button" onClick={handleLogout}>
          로그아웃{' '}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
