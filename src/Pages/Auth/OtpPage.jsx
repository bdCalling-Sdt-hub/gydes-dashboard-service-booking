import { Button, Form } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import Container from "../../Components/UI/Container";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  useForgetOtpVerifyMutation,
  useResendForgetOTPMutation,
} from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../utils/localStorage";
import Cookies from "js-cookie";

const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [forgetPasswordOTPResend] = useResendForgetOTPMutation();
  const [ForgetVerifiedEmail] = useForgetOtpVerifyMutation();
  const token = Cookies.get("gydes_accessToken");
  const forgetPasswordToken = getFromLocalStorage("gydes_forgetPasswordToken");

  if (token) {
    return (window.location.href = "/");
  }

  if (!forgetPasswordToken) {
    return (window.location.href = "/forgot-password");
  }

  const handleOTPSubmit = async () => {
    const toastId = toast.loading("Verifying...");

    if (otp.length < 6) {
      toast.error("The OTP must be 6 digits long", {
        id: toastId,
        duration: 2000,
      });
    } else {
      const data = {
        otp: otp,
      };

      try {
        const res = await ForgetVerifiedEmail(data).unwrap();
        console.log(res);
        if (res.success) {
          toast.success("Email verified successfully", {
            id: toastId,
            duration: 2000,
          });
          setToLocalStorage(
            "gydes_forgetOtpMatchToken",
            res?.data?.forgetOtpMatchToken
          );
          removeFromLocalStorage("gydes_forgetPasswordToken");
          navigate("/update-password");
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.data?.message || "An error occurred during login", {
          id: toastId,
          duration: 3000,
        });
      }
    }
  };

  const handleResendOTP = async () => {
    const toastId = toast.loading("Resending OTP...");

    try {
      const res = await forgetPasswordOTPResend().unwrap();

      if (res.success) {
        toast.success("OTP resent successfully!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to resend OTP", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <div className="text-base-color">
      <Container>
        <div className="min-h-screen flex justify-center items-center text-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                Check your email
              </h1>
              <div className="text-[#667085]">
                <p className="lg:text-lg">We sent a verification link to</p>
                <p className="lg:text-lg mb-2 ">user@example.com</p>
              </div>
            </div>

            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[55px] h-[45px] !sm:w-[76px] sm:h-[64px] text-[20px] sm:text-[30px] bg-[#edfaff] border-dashed border-input-color
                      hover:border-input-color focus:bg-[#edfaff] focus:border-input-color rounded-lg mr-[10px] sm:mr-[20px] text-secondary-color"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full  py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                  onClick={handleOTPSubmit}
                >
                  Verify OTP
                </Button>
              </Form.Item>
            </Form>
            <div className="flex justify-center gap-2 py-1">
              <p>Didn’t receive code?</p>
              <p
                onClick={handleResendOTP}
                className="!text-secondary-color !underline font-semibold cursor-pointer"
              >
                Click to resend
              </p>
            </div>

            <div className="text-[#667085] w-fit mx-auto mt-10">
              <Link
                to={"/signin"}
                className="flex justify-center items-center  gap-2 "
              >
                <FaArrowLeftLong className="size-4 mt-1" />
                <span>Back to log in</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default OtpPage;
