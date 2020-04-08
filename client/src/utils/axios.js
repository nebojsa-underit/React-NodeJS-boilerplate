import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/"
});

instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "jwtToken"
)}`;

export default instance;
