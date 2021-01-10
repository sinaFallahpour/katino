import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const UploadPdfEndPoint = API_ADDRESS + "Resome/UploadPdfFile";
const GetPdfEndPoint = API_ADDRESS + "Resome/LoadResomePDF";
const DeletePdfEndPoint = API_ADDRESS + "Resome/DeleteResomePDF";

export const UploadFile = async (formData) => {
  const { data } = await axios.post(UploadPdfEndPoint, formData, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};

export const GetPdfFile = async () => {
  const { data } = await axios.get(
    GetPdfEndPoint,
    {},
    {
      headers: {
        Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
      },
    }
  );

  return data;
};

export const DeletePdfFile = async () => {
  const { data } = await axios.post(
    DeletePdfEndPoint,
    {},
    {
      headers: {
        Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
      },
    }
  );

  return data;
};
