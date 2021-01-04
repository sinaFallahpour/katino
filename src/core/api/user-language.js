import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const getLanguagesEndPoint = API_ADDRESS + "UserLanguage/GetUserLanguage";
const AddLanguageEndPoint = API_ADDRESS + "UserLanguage/AddUserLanguage";
const deleteLanguageEndPoint =
  API_ADDRESS + "UserLanguage/DeleteWorkExperience";
const editLanguageEndPoint = API_ADDRESS + "UserLanguage/EditUserLanguage";

export const getEduBackground = async (id) => {
  const { data } = await axios.get(
    `${getLanguagesEndPoint}?id=${id}`,
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
  const { data } = await axios.post(`${AddLanguageEndPoint}`, formData, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};

export const DeleteEduBackground = async (id) => {
  const { data } = await axios.delete(
    `${deleteLanguageEndPoint}?id=${id}`,
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
  const { data } = await axios.post(editLanguageEndPoint, form, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};
