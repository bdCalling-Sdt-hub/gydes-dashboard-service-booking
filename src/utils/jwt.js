import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const decodedToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    Cookies.remove("gydes_accessToken");
    localStorage.removeItem("persist:gydes");
    return null; // Return null instead of crashing the app
  }
};
