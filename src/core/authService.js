// import { requests } from "../agent";

import jwtDecode from "jwt-decode";
const tokenKey = "JWT";

// export async function login(phoneNumber, password) {
//   const { data } = await requests.post("/Account/AdminLogin", {
//     phoneNumber,
//     password,
//   });

//   const jwt = data.result.data.token;
//   localStorage.setItem(tokenKey, jwt);
// }

export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getRole() {
  const token = getJwt();
  if (!token) return undefined;
  const payloat = jwtDecode(token);
  return payloat.role;
}

// // // // // // // export async function checkTokenIsValid() {
// // // // // // //   const token = getJwt();
// // // // // // //   if (!token) return false;
// // // // // // //   try {
// // // // // // //     await requests.get("/Account/CheckTokenIsValid");
// // // // // // //     return true;
// // // // // // //   } catch (error) {
// // // // // // //     return false;
// // // // // // //   }
// // // // // // // }

// export function isInRoleAdmin() {
//   var user = getCurrentUser();
// if(!user || )
// }

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

// export function getPermissons() {
//   const token = getJwt();
//   if (!token) return undefined;
//   const payloat = jwtDecode(token);
//   return payloat.Permissions;
// }

// export function getRole() {
//   const token = getJwt();
//   if (!token) return undefined;
//   const payloat = jwtDecode(token);
//   return payloat.role;
// }

export default {
  // login,
  logout,
  // checkTokenIsValid,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  // getPermissons,
  getRole,
};
