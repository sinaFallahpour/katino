import axios from "axios";
import API_ADDRESS from "../../../API_ADDRESS";

export const apiAddresses = {
  latest: API_ADDRESS + "Adver/GetLastAdversForIndex?pageSize=6",
  immediately:
    API_ADDRESS + "Adver/GetLastImmediatelyAdversForIndex?pageSize=6",
};

export const adsServices = {
  getLatest: () => axios.get(apiAddresses.latest),
  getImmediately: () => axios.get(apiAddresses.immediately),
};
