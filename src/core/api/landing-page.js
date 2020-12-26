import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const LandingPageEndPoint = API_ADDRESS + "Setting/GetAllInfoForIndexForFront";

export const GetLandingPage = async () => {
  const { data } = await axios.get(LandingPageEndPoint);

  return data;
};
