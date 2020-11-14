import API_ADDRESS from "../../API_ADDRESS";
import axios from "axios";

export function getMarkedAds(page, size) {
  return axios.get(
    API_ADDRESS +
      `Adver/GetAllMarkedAdverForUser?page=${page}&pageSize=${size}`,
    {
      headers: {
        Authorization: `bearer ${localStorage.getItem("JWT")}`,
      },
    }
  );
}
