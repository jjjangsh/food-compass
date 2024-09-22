// SignUp.js
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
    <div className="flex items-center justify-center w-full relative top-[50px]">
      <div className="bg-orange-400 mt-44 shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-center">
          <img
            src="/assets/logo_white.png"
            style={{
              width: '150px',
              height: '150px',
              marginBottom: '20px',
              borderRadius: '50%'
            }}
          />
        </div>
        <AuthForm type="signup" onSubmit={handleSignup} />
      </div>
    </div>
  );
};

export default SignUp;
