import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input, Typography } from "antd";

import Container from "../../Components/UI/Container";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  setAccessToken,
  setUserInfo,
} from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/features/auth/authApi";

const SignIn = () => {
  const dispatch = useDispatch();
  const [userLogin] = useLoginMutation();
  const token = Cookies.get("gydes_accessToken");

  if (token) {
    return (window.location.href = "/");
  }

  const onFinish = async (values) => {
    console.log(values);
    const toastId = toast.loading(" Logging in...");

    // navigate.push("/");

    const loginData = {
      email: values.email,
      password: values.password,
    };

    console.log("Login Data:", loginData);

    try {
      const res = await userLogin(loginData).unwrap();
      console.log(res);
      //* Dispatch the accessToken and userInfo to Redux store
      dispatch(setAccessToken(res?.data?.accessToken));
      dispatch(setUserInfo(res?.data?.attributes));
      Cookies.set("gydes_accessToken", res?.data?.accessToken, {
        path: "/",
        // remote: true,
        expires: 365,
        secure: false,
      });
      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.error ||
          "An error occurred during Login",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  return (
    <div className="text-base-color">
      <Container>
        <div className=" min-h-screen flex justify-center items-center">
          <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[40%] mx-auto">
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-5 mb-8">
                <h1 className="text-3xl sm:text-4xl font-medium mb-4">
                  Log in to your account
                </h1>
                <p className="text-lg sm:text-xl mb-2 ">
                  Welcome back! Please enter your details.
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Email
              </Typography.Title>
              <Form.Item
                name="email"
                className="text-base-color"
                rules={[
                  {
                    required: true,
                    message: "Email is Required",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your email"
                  className="py-2 px-3 text-xl bg-site-color border !border-[#667085] text-base-color"
                />
              </Form.Item>
              <Typography.Title level={4} style={{ color: "#222222" }}>
                Password
              </Typography.Title>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Password is Required",
                  },
                ]}
                name="password"
                className="text-base-color"
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="py-2 px-3 text-xl bg-site-color border !border-[#667085] text-base-color"
                />
              </Form.Item>

              <div className="flex justify-between items-center mt-10">
                <Checkbox className="">Remember me</Checkbox>
                <Link
                  to="/forgot-password"
                  className="!text-secondary-color !underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full py-6 border border-secondary-color hover:border-secondary-color text-xl text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
