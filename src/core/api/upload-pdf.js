import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const UploadPdfEndPoint = API_ADDRESS + "Resome/UploadPdfFile";

export const UploadFile = async (formData) => {
  const { data } = await axios.post(UploadPdfEndPoint, formData, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};
