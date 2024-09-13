import { useNavigate } from "react-router-dom";

const Header = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed w-full bg-sky-200 h-20 p-5">
        <div className="flex flex-row justify-between">
          <p onClick={() => navigate("/")}>로고입니다</p>
          <div>
            <button onClick={() => navigate("/signin")}>로그인</button>
            <button onClick={() => navigate("/signup")}>회원가입</button>
          </div>
        </div>
      </div>
      <div className="flex w-full pt-24">{children}</div>
    </>
  );
};

export default Header;
