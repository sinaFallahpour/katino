import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const EmployeeHelperEndPoint = API_ADDRESS + "Setting/GetEmployeeHelper";

export const GetEmployeeHelper = async () => {
  const { data } = await axios.get(EmployeeHelperEndPoint);

  return data;
};
