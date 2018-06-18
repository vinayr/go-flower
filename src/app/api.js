import axios from "axios";

const baseURL = "http://localhost:8000";

const _axios = axios.create({ baseURL });

_axios.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
});

_axios.interceptors.response.use(response => response.data);

const api = {};

api.signup = params => axios.post(`${baseURL}/signup`, params).then(res => res.data);
api.signin = params => axios.post(`${baseURL}/signin`, params).then(res => res.data);

api.refreshToken = () => _axios.get(`/refresh_token`);
api.fetchUsers = () => _axios.get(`/admin/users`);
api.fetchUser = id => _axios.get(`/admin/users/${id}`);
api.deleteUser = id => _axios.delete(`/admin/users/${id}`);
api.fetchProfile = () => _axios.get(`/profile`);

export default api;
