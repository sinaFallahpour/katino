import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const PolicyEndPoint = API_ADDRESS + "Setting/GetPolicy";

export const GetPolicy = async () => {
  const { data } = await axios.get(PolicyEndPoint);

  return data;
};
