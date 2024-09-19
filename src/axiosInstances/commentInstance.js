import axios from "axios";

const commentInstance = axios.create({
  baseURL: "http://localhost:4000/comments"
})

export default commentInstance;