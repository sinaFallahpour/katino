import API_ADDRESS from "../../API_ADDRESS";
import axios from "axios";

export function getTickets() {
  return axios.get(API_ADDRESS + "Tickets/GetAllTicketForUser", {
    headers: { Authorization: window.localStorage.getItem("JWT") },
  });
}

export function getTicketInfo(id) {
  return axios.get(API_ADDRESS + `Tickets/GetTicketInfo?id=${id}`, {
    headers: { Authorization: window.localStorage.getItem("JWT") },
  });
}
