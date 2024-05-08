import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"))

const http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token.value}`,
  },
});

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use((response) => {
  return response;
});

export default http;
