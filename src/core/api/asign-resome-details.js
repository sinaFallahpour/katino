import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const GetAwnserAndQuestionEndPoint =
  API_ADDRESS + "Resome/GetAsignResomeDetailsForEmployee";

export const GetAwnserAndQuestion = async (asignId) => {
  const { data } = await axios.get(
    `${GetAwnserAndQuestionEndPoint}?asignId=${asignId}`
  );

  return data;
};
