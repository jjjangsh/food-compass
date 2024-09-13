import { useState } from 'react';

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    nickname: type === 'signin' ? undefined : ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredFormData = { ...formData };

    if (type === 'signin') {
      delete filteredFormData.nickname;
    }

    onSubmit(filteredFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디를 입력해주세요."
          required
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요."
          required
        />
      </div>
      {type === 'signup' && (
        <div>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요."
            required
          />
        </div>
      )}
      <button>{type === 'signin' ? '로그인' : '회원가입'}</button>
    </form>
  );
};

export default AuthForm;
