import API_ADDRESS from "../../API_ADDRESS";
import axios from "axios";

export function getUserAds() {
  return axios.get(API_ADDRESS + "Adver/GetAllAdverForCurrectUser", {
    headers: {
      Authorization: `bearer ${localStorage.getItem("JWT")}`,
    },
  });
}
