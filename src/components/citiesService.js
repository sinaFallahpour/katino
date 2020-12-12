import axios from "axios"
import API_ADDRESS from "../API_ADDRESS"

export const citiesService = {
  getCities: () => axios.get(API_ADDRESS + "Account/GetCities"),
}

export function searchAdver(key, city, page, pageSize) {
  // if (key && city) {
  //   return axios.get(
  //     API_ADDRESS +
  //       `Adver/SearchAdver?key=${key}&city=${city}&page=${page}&pageSize=${pageSize}`
  //   );
  // }

  // if (key && !city) {
  //   return axios.get(
  //     API_ADDRESS +
  //       `Adver/SearchAdver?key=${key}&page=${page}&pageSize=${pageSize}`
  //   );
  // }

  return axios.get(
    API_ADDRESS +
      `Adver/SearchAdver?key=${key}&page=${page}&pageSize=${pageSize}`
  )
}

export function latestAdvers(page, pageSize) {
  return axios.get(
    API_ADDRESS +
      `Adver/GetLastAdversForIndex?page=${page}&pageSize=${pageSize}`
  )
}

export function searchAdverFilter(page, pageSize, body) {
  return axios.post(
    API_ADDRESS + `Adver/FilterAdver?page=${page}&pageSize=${pageSize}`,
    body
  )
}
