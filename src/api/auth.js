import authInstance from "../axiosInstances/authInstance";

// 회원가입 요청
export const register = async (formData) => {
  const { data } = await authInstance.post("/register", formData);
  return data;
};


// 로그인 요청
export const login = async (formData) => {
  const { data } = await authInstance.post("/login", formData);
  return data;
};


// 닉네임 수정 요청
export const updateProfile = async (nickname, accessToken) => {
  const { data } = await authInstance.patch(
    "/profile",
    { nickname },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return data;
};