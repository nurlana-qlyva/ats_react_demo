import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use((response) => {
  return response;
});

export default http;