import API_ADDRESS from "../../API_ADDRESS";
import axios from "axios";

export function getPlans() {
  return axios.get(API_ADDRESS + "plan/GetAllPlansForCompanies");
}
