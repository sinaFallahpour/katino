import axios from "axios";
// import { history } from "../..";
import { toast } from "react-toastify";
import { createBrowserHistory } from "history";

export let history = createBrowserHistory();
export const baseUrl = "https://katino.niknet.co/api/";
export const mainUrl = "https://katino.niknet.co/";
//axios.defaults.baseURL = "https://localhost:44377/api";

axios.defaults.baseURL = "https://katino.niknet.co/api";
export const avatarUrl = "https://katino.niknet.co/img/employeeAvatar";

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
    toast.error("اینترنت خود را بررسی کنید");
  }

  if (error?.response?.status == 404) {
    toast.error("خطایی رخ داده!");
  }

  if (error?.response?.status == 401 || error?.response?.status == 403) {
    window.localStorage.removeItem("JWT");
    window.localStorage.removeItem("userInfo");
    window.location.href = "/Employee/Login/";

    // history.push("/Employee/Login/");
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

  postForm2: (url, propertyName, file) => {
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
    requests.post(`/Resome/AsignResomeToListOfAdvers`, adverIdlist),

  getAllAdverForCurrectUser: () =>
    requests.get(`/Adver/GetAllAdverForCurrectUser`),

  GetAllAdverByStatusForCurrectUser: (adverStatus) =>
    requests.get(
      `/Adver/GetAllAdverByStatusForCurrectUser?adverStatus=${adverStatus}`
    ),

  SearchAdverForCurrectUser: (key) =>
    requests.get(`/Adver/SearchAdverForCurrectUser?key=${key}`),
};

const CreateResome = {
  editEmployeePersonalInformation: (body) =>
    requests.post("/Account/EditEmployeePersonalInformation", body),
  loadEmployeePersonalInformation: () =>
    requests.get("/Account/LoadEmployeePersonalInformation"),

  AddEmployeeAboutMen: (body) =>
    requests.post("/Resome/AddEmployeeAboutMe", body),

  LoadEmployeeAboutMe: () => requests.get("/Resome/LoadEmployeeAboutMe"),

  AddUserJobSkill: (id) => requests.post("/UserJobSkill/AddUserJobSkill", id),

  DeleteUserJobSkill: (id) =>
    requests.del(`/UserJobSkill/DeleteUserJobSkill?id=${id}`),

  GetAlljobSkillsForSelect: () =>
    requests.get("/JobSkills/GetAlljobSkillsForSelect"),

  getAllUserJobSkillsForCurrentUser: () =>
    requests.get("/UserJobSkill/GetAllUserJobSkillsForCurrentUser"),

  getAllCategories: () => requests.get("/Categories/GetAllCategories"),

  employeeChangeAvatar: () => requests.get("/Account/EmployeeChangeAvatar"),

  GetUserJobPreferenceForCurrentUser: () =>
    requests.get("/UserJobPreference/GetUserJobPreferenceForCurrentUser"),

  GetAllWorkExperience: () =>
    requests.get("/UserWorkExperience/GetAllWorkExperienceForCuurectUser"),

  GetAllEduBackground: () =>
    requests.get(
      "/EducationalBackground/GetAllEducationalBackgroundForCuurectUser"
    ),

  GetAllLanguageForCurrentUser: () =>
    requests.get("/UserLanguage/GetAllUserLanguagesForCurrentUser"),

  GetAllLanguages: () => requests.get("/Languages/GetAllLanguages"),

  AddUserJobPreference: (body) =>
    requests.post("/UserJobPreference/AddUserJobPreference", body),

  DeleteUserJobPreference: (id) =>
    requests.del(`/UserJobPreference/DeleteUserJobPreference?id=${id}`),

  EditUserJobPreference: (body) =>
    requests.post("/UserJobPreference/EditUserJobPreference", body),

  GetResomePercent: () => requests.get("/Resome/GetResomePercent"),

  GetResomeAsignForEmployee: () =>
    requests.get("/Resome/GetAllAsignResomeForEmployee"),

  SuggestionAdverForUser: (body) =>
    requests.post(
      `/Adver/SuggestionAdverForUser?page=${body.page}&pageSize=${body.pageSize}`,
      {},
      {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
        },
      }
    ),
};

const Resome = {
  ChangeAsignResomeStatus: (asignResomeId, asingResomeStatus, description) =>
    requests.post(
      `/Resome/ChangeAsignResomeStatus?AsignResomeId=${asignResomeId}&&AsingResomeStatus=${asingResomeStatus}&&Description=${description}`
    ),

  GetUserShortInfoForResome: (asignId) =>
    requests.get(`/Resome/GetUserShortInfoForResome?asignId=${asignId}`),

  GetAsignResomeStatus: (asignId) =>
    requests.get(`/Resome/GetAsignResomeStatus?asignResomeId=${asignId}`),
};

const RequestDetails = {
  LoadCommentForAsignResome: (asignId) =>
    requests.get(`/Resome/LoadCommentForAsignResome?asignId=${asignId} `),

  AddCommentForAsignResome: (body) =>
    requests.post("/Resome/AddCommentForAsignResome", body),

  FilterAllResomesInfoForAdver: (body) =>
    requests.post("/Resome/FilterAllResomesInfoForAdver", body),
};

const Cities = {
  Cities: () => requests.get("/Account/GetCities"),
};

const Ticket = {
  answerTicker: (data) => requests.post("/Tickets/AnswerTicket", data),
  createTicket: (data) => requests.post("/Tickets/CreateTicket", data),
};

const Plans = {
  plan: () => requests.get("/plan/getallplanforemployee"),
  gotoDargah: (planId) =>
    requests.post(`/employeePayment/employeepaymentPlan?planId=${planId} `),
};

export default {
  Adver,
  CreateResome,
  Cities,
  RequestDetails,
  Ticket,
  Plans,
  Resome,
};
