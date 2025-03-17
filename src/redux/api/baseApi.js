/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";
import { getBaseUrl } from "../../helpers/config/envConfig";
import { getFromLocalStorage } from "../../utils/localStorage";
import Cookies from "js-cookie";
import { clearAuth } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = Cookies.get("gydes_accessToken");
    const forgetPasswordToken = getFromLocalStorage(
      "gydes_forgetPasswordToken"
    );
    const forgetOtpMatchToken = getFromLocalStorage(
      "gydes_forgetOtpMatchToken"
    );

    // Only set authorization header if token is not already set
    if (token) {
      headers.set("token", `${token}`);
    }

    if (forgetPasswordToken) {
      headers.set("token", JSON.parse(forgetPasswordToken));
    }

    if (forgetOtpMatchToken) {
      headers.set("token", forgetOtpMatchToken);
    }

    return headers;
  },
});

const baseQueryWithAuthCheck = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const { status, data } = result.error;

    if (status === 401 || status === 500) {
      // Dispatch logout action
      Cookies.remove("gydes_accessToken");
      api.dispatch(clearAuth());
      window.location.reload();
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthCheck,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
