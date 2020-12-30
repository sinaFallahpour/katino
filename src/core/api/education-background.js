import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const getEduBackEndPoint =
  API_ADDRESS + "EducationalBackground/GetEducationalBackground";
const AddEduBackEndPoint =
  API_ADDRESS + "EducationalBackground/AddEducationalBackground";
const deleteEduBackEndPoint =
  API_ADDRESS + "EducationalBackground/DeleteEducationalBackground";
const editEduBackEndPoint =
  API_ADDRESS + "EducationalBackground/EditEducationalBackground";

export const getEduBackground = async (id) => {
  const { data } = await axios.get(
    `${getEduBackEndPoint}?id=${id}`,
    {},
    {
      headers: {
        Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
      },
    }
  );

  return data;
};

export const AddEduBackground = async (formData) => {
  const { data } = await axios.post(`${AddEduBackEndPoint}`, formData, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};

export const DeleteEduBackground = async (id) => {
  const { data } = await axios.delete(
    `${deleteEduBackEndPoint}?id=${id}`,
    {},
    {
      headers: {
        Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
      },
    }
  );

  return data;
};

export const editEduBackground = async (form) => {
  const { data } = await axios.post(editEduBackEndPoint, form, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};
