import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import AuthForm from '../components/AuthForm';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      const response = await register(formData);
      if (response.success) {
        alert(response.message);
        navigate('/signin');
      }
    } catch (error) {
      alert('회원가입에 실패했습니다.');
      console.log('회원가입 에러 => ', error);
    }
  };
  return (
    <div>
      <div>
        <h4>회원가입 페이지</h4>
        <AuthForm type="signup" onSubmit={handleSignup} />
      </div>
    </div>
  );
};

export default SignUp;
