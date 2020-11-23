import API_ADDRESS from "../../API_ADDRESS";
import axios from "axios";

export function getUserAds() {
  return axios.get(API_ADDRESS + "Adver/GetAllAdverForCurrectUser", {
    headers: {
      Authorization: `bearer ${localStorage.getItem("JWT")}`,
    },
  });
}

export function sidebar(id) {
  return axios.post(
    `${API_ADDRESS}Resome/GetAllResomesInfoWithCount?adverId=${id}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` } }
  );
}

export function getAdverResumes(id) {
  return axios.post(
    `${API_ADDRESS}Resome/GetAllResomesInfoForAdver?adverId=${id}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` } }
  );
}

export function userAllInfoForResome(resumeId) {
  return axios.get(
    `${API_ADDRESS}Resome/UserAllInfoForResome?resomeId=${resumeId}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` } }
  );
}
