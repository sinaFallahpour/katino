import axios from "axios";
import API_ADDRESS from "../../../API_ADDRESS";

export const companyService = {
  getCompanies: () => axios.get(API_ADDRESS + "Account/GetCompanyLogoInIndex/"),
};
