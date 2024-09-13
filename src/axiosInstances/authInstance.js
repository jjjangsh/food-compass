import axios from "axios";

const authInstance = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

export default authInstance;
