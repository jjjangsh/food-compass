import { useNavigate } from 'react-router-dom';
import userStore from '../zustand/userStore';
import Weather from './Weather';

const Header = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = userStore();
  return (
    <>
      <div className="fixed w-full bg-orange-400 h-24 z-50">
        <div className="flex flex-row justify-between p-2">
          <img
            onClick={() => navigate('/')}
            width={75}
            src="src/assets/logo_white.png"
            className="rounded-full hover:cursor-pointer"
            alt="로고"
          />

          <div className="flex flex-row gap-2 px-4 justify-center items-center">
            <Weather />
            {user ? (
              <>
                <button onClick={() => navigate('/mypage')} className="headerBtn">
                  마이페이지
                </button>
                <button onClick={logout} className="headerBtn bg-white text-white">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/signin')} className="headerBtn">
                  로그인
                </button>
                <button onClick={() => navigate('/signup')} className="headerBtn">
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center py-4">{children}</div>
    </>
  );
};

export default Header;
