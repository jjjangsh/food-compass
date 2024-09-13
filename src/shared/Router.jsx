import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import SignIn from "./../pages/SignIn";
import SignUp from "./../pages/SignUp";
import PostDetail from "./../pages/PostDetail";
import PostWrite from "./../pages/PostWrite";
import PostUpdate from "./../pages/PostUpdate";
import MyPage from "./../pages/MyPage";

// 로그인 임시 상태값
const token = true;

const Router = () => {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<AuthRoute />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/postdetail" element={<PostDetail />} />
            <Route path="/postwrite" element={<PostWrite />} />
            <Route path="/postupdate" element={<PostUpdate />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </Header>
    </BrowserRouter>
  );
};

export default Router;

// 로그인 시 접근 불가
const AuthRoute = () => {
  if (token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

// 비로그인 시 접근 불가
const PrivateRoute = () => {
  if (!token) {
    return <Navigate to="/sign#in" />;
  }
  return <Outlet />;
};
