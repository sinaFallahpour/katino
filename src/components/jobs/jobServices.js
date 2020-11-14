import axios from "axios";
import API_ADDRESS from "../../API_ADDRESS";

export const jobServices = {
  getJobs: () =>
    axios.get(API_ADDRESS + "Adver/GetLastAdversForIndex?pageSize=10"),
  getCategories: () =>
    axios.get(
      API_ADDRESS + "Categories/GetAllCategories",
      {},
      {
        headers: {
          Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
        },
      }
    ),
};
