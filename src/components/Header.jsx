import { useNavigate } from "react-router-dom";
import HeaderButton from "./HeaderButton";

const Header = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed w-full bg-sky-200 h-20 p-5">
        <div className="flex flex-row justify-between">
          <button onClick={() => navigate("/")}>로고입니다</button>
          <div className="flex flex-row gap-2 px-4">
            <HeaderButton onClick={() => navigate("/signin")} name={"로그인"} />
            <HeaderButton
              onClick={() => navigate("/signup")}
              name={"회원가입"}
            />

            <HeaderButton
              onClick={() => navigate("/mypage")}
              name={"마이페이지"}
            />
            <HeaderButton onClick={() => {}} name={"로그아웃"} />
          </div>
        </div>
      </div>
      <div className="flex w-full pt-24">{children}</div>
    </>
  );
};

export default Header;
