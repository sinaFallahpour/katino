import axios from "axios";
import API_ADDRESS from "../../API_ADDRESS";

export function bestCompanies() {
  return axios.get(API_ADDRESS + "Account/ListOfTop50Companies");
}

export function allCompanies() {
  return axios.get(API_ADDRESS + "Account/GetAllCompanies");
}

export function getCities() {
  return axios.get(API_ADDRESS + "Account/GetCities");
}

export function getCompanyDetails(name) {
  return axios.get(
    API_ADDRESS + `Account/CompanyDetails?CompanyEngName=${name}`
  );
}
