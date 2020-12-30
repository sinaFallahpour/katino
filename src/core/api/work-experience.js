import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const getWorkExperienceEndPoint =
  API_ADDRESS + "UserWorkExperience/GetWorkExperience";
const AddWorkExperienceEndPoint =
  API_ADDRESS + "UserWorkExperience/AddWorkExperience";
const deleteWorkExperienceEndPoint =
  API_ADDRESS + "UserWorkExperience/DeleteWorkExperience";
const editWorkExperienceEndPoint =
  API_ADDRESS + "UserWorkExperience/EditWorkExperience";

export const getWorkExperience = async (id) => {
  const { data } = await axios.get(
    `${getWorkExperienceEndPoint}?id=${id}`,
    {},
    {
      headers: {
        Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
      },
    }
  );

  return data;
};

export const AddWorkExperience = async (formData) => {
  const { data } = await axios.post(`${AddWorkExperienceEndPoint}`, formData, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};

export const DeleteWorkExperience = async (id) => {
  const { data } = await axios.delete(
    `${deleteWorkExperienceEndPoint}?id=${id}`,
    {},
    {
      headers: {
        Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
      },
    }
  );

  return data;
};

export const EditWorkExperience = async (form) => {
  const { data } = await axios.post(editWorkExperienceEndPoint, form, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};
