import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Home from "../pages/Home";
import SignIn from "./../pages/SignIn";
import SignUp from "./../pages/SignUp";
import PostDetail from "./../pages/PostDetail";
import PostWrite from "./../pages/PostWrite";
import PostUpdate from "./../pages/PostUpdate";
import MyPage from "./../pages/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/postdetail" element={<PostDetail />} />
          <Route path="/postwrite" element={<PostWrite />} />
          <Route path="/postupdate" element={<PostUpdate />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
};

export default Router;
