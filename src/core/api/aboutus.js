import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const AboutUsEndPoint = API_ADDRESS + "Setting/GetAboutUs";

export const GetAboutUs = async () => {
  const { data } = await axios.get(AboutUsEndPoint);

  return data;
};
