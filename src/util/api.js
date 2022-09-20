import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const api = {
  users: {
    query: (params) => axios.get(`${BASE_URL}/users`, params),
    show: (id) => axios.get(`${BASE_URL}/users/${id}`),
  },
  posts: {
    query: (params) => axios.get(`${BASE_URL}/posts`, { params }),
    show: (id) => axios.get(`${BASE_URL}/posts/${id}`),
  },
  comments: {
    query: (params) => axios.get(`${BASE_URL}/comments`, { params }),
    show: (id) => axios.get(`${BASE_URL}/comments/${id}`),
  },
};

export default api;
