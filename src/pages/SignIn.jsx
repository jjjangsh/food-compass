// SignIn.js
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import userStore from '../zustand/userStore';

const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = userStore();

  const handleLogin = async (formData) => {
    try {
      const response = await login(formData);

      if (response.success) {
        alert('로그인 성공! 메인 페이지로 이동합니다.');
        console.log('로그인 페이지에서 테스트용 콘솔 ', response);
        setUser(response);
        navigate('/');
      }
    } catch (error) {
      alert('로그인에 실패했습니다.');
      console.log('로그인 에러 => ', error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full relative top-24">
      <div className="bg-orange-400 shadow-md rounded-lg mt-44 p-8 w-full max-w-md">
        <div className="flex items-center justify-center">
          <img
            src="src/assets/logo_white.png"
            style={{
              width: '150px',
              height: '150px',
              marginBottom: '20px',
              borderRadius: '50%'
            }}
          />
        </div>
        <AuthForm type="signin" onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default SignIn;
