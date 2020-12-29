import axios from "axios";

import API_ADDRESS from "../../API_ADDRESS";

const AddWorkExperienceEndPoint =
  API_ADDRESS + "UserWorkExperience/AddWorkExperience";

export const AddWorkExperience = async (formData) => {
  const { data } = await axios.post(`${AddWorkExperienceEndPoint}`, formData, {
    headers: {
      Authorization: `bearer ${window.localStorage.getItem("JWT")}`,
    },
  });

  return data;
};
