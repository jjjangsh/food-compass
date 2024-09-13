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
        alert('로그인 성공!, 메인 페이지로 이동합니다.');
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
    <div>
      <div>
        <h3>로그인 페이지</h3>
        <AuthForm type="signin" onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default SignIn;
