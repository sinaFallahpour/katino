import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const AddJobpreferenceEndPoint =
  API_ADDRESS + "UserJobPreference/AddUserJobPreference";
const deleteJobpreferenceEndPoint =
  API_ADDRESS + "UserJobPreference/DeleteUserJobPreference";
const editJobpreferenceEndPoint =
  API_ADDRESS + "UserJobPreference/EditUserJobPreference";

export const AddJobpreference = async (formData) => {
  const { data } = await axios.post(`${AddJobpreferenceEndPoint}`, formData, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};

export const DeleteJobpreference = async (id) => {
  const { data } = await axios.delete(
    `${deleteJobpreferenceEndPoint}?id=${id}`,
    {},
    {
      headers: {
        Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
      },
    }
  );

  return data;
};

export const EditJobpreference = async (form) => {
  const { data } = await axios.post(editJobpreferenceEndPoint, form, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};
