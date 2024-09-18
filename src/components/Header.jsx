import { useNavigate } from "react-router-dom";
import userStore from "../zustand/userStore";

const Header = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = userStore();
  return (
    <>
      <div className="fixed w-full bg-sky-200 h-20 p-5 z-50">
        <div className="flex flex-row justify-between">
          <button onClick={() => navigate("/")}>로고입니다</button>
          <div className="flex flex-row gap-2 px-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate("/mypage")}
                  className="headerBtn"
                >
                  마이페이지
                </button>
                <button onClick={logout} className="headerBtn">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/signin")}
                  className="headerBtn"
                >
                  로그인
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="headerBtn"
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full pt-24">{children}</div>
    </>
  );
};

export default Header;
