import axios from "axios";
// import { history } from "../..";
import { toast } from "react-toastify";
export const baseUrl = "https://katino.niknet.co/api/";
//axios.defaults.baseURL = "https://localhost:44377/api";
axios.defaults.baseURL = "https://katino.niknet.co/api";

// const token = window.localStorage.getItem("jwt");
// axios.config.headers.Authorization = `Bearer ${token}`;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("JWT");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
  // (error) => {
  //   return Promise.reject(error);
  // }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running!");
  }

  if (error?.response.status == 404) {
    toast.error("خطایی رخ داده!");
  }
  // const { status, data, config } = error?.response;
  //   if (status === 404) {
  //     history.push("/notfound");
  //   }
  // if (
  //   status === 400 &&
  //   config.method === "get" &&
  //   data.errors.hasOwnProperty("id")
  // ) {
  //   history.push("/notfound");
  // }
  if (error?.response?.status === 500) {
    toast.error("خطایی رخ داده!");
  }
  //   throw error.response;
  return Promise.reject(error);
});

// const responseBody = (response) => response.data;

export const requests = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  del: (url) => axios.delete(url),
  postForm: (url, file) => {
    const formData = new FormData();
    formData.append("File", file);
    return axios.post(url, formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  },
};

const Adver = {
  // current: () => requests.get("/user"),
  filterAdver: (body, page, pageSize) =>
    requests.post(`/Adver/FilterAdver?page=${page}&pageSize=${pageSize}`, body),
  searchAdver: (params) => requests.get(`/Adver/SearchAdver?${params}`),

  markAdvder: (params) => requests.post(`/Adver/MarkAdvder?adverId=${params}`),
  unmarkAdvder: (params) =>
    requests.post(`/Adver/UnMarkAdvder?adverId=${params}`),

  asignResomeToAdver: (adverId) =>
    requests.post(`/Resome/AsignResomeToAdver?adverId=${adverId}`),

  asignResomeToListOfAdvers: (adverIdlist) =>
    requests.post(`/Resome/AsignResomeToListOfAdvers?adversId=${adverIdlist}`),
};

export default {
  Adver,
};
