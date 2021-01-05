import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const getLanguagesEndPoint = API_ADDRESS + "UserLanguage/GetUserLanguage";
const AddLanguageEndPoint = API_ADDRESS + "UserLanguage/AddUserLanguage";
const deleteLanguageEndPoint = API_ADDRESS + "UserLanguage/DeleteUserLanguage";
const editLanguageEndPoint = API_ADDRESS + "UserLanguage/EditUserLanguage";

export const getLanguage = async (id) => {
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

export const AddLanguage = async (formData) => {
  const { data } = await axios.post(`${AddLanguageEndPoint}`, formData, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};

export const DeleteLanguage = async (id) => {
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

export const editLanguage = async (form) => {
  const { data } = await axios.post(editLanguageEndPoint, form, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};
