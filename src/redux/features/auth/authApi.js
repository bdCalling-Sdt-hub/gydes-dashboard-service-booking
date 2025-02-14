import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const auth_url = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (loginData) => ({
        url: `${auth_url}/login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgetPassword: build.mutation({
      query: (userEmail) => {
        return {
          url: `${auth_url}/forgot-password-otpByEmail`,
          method: "POST",
          body: userEmail,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    resendForgetOTP: build.mutation({
      query: () => {
        return {
          url: `/otp/resend-otp`,
          method: "PATCH",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    forgetOtpVerify: build.mutation({
      query: (otpData) => {
        return {
          url: `${auth_url}/forgot-password-otp-match`,
          method: "PATCH",
          body: otpData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    resetPassword: build.mutation({
      query: (resetData) => {
        return {
          url: `${auth_url}/forgot-password-reset`,
          method: "PATCH",
          body: resetData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
    changePassword: build.mutation({
      query: (resetData) => {
        return {
          url: `${auth_url}/change-password`,
          method: "PATCH",
          body: resetData,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useResendForgetOTPMutation,
  useForgetOtpVerifyMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
