// AuthForm.js
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
      <div className="mb-4">
        <label className="block text-sm text-sky-700 font-bold">아이디</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디를 입력해주세요."
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-sky-700 font-bold">비밀번호</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요."
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
        />
      </div>
      {type === 'signup' && (
        <div className="mb-4">
          <label className="block text-sm text-sky-700 font-bold">닉네임</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요."
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-sky-700 text-white font-bold py-2 rounded hover:bg-sky-900 transition duration-300"
      >
        {type === 'signin' ? '로그인' : '회원가입'}
      </button>
    </form>
  );
};

export default AuthForm;
