import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const AwnserAndQuestionEndPoint =
  API_ADDRESS + "AnswerQuestion/GetAllAnswerQuestion";

export const GetAwnserAndQuestion = async () => {
  const { data } = await axios.get(AwnserAndQuestionEndPoint);

  return data;
};
