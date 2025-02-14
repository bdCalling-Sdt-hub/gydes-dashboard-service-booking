import { Button, Form, Input, Typography } from "antd";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../../redux/features/auth/authSlice";
import Cookies from "js-cookie";

const ChangePassword = () => {
  const [updatePassword] = useChangePasswordMutation();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const toastId = toast.loading("Updating Password...");

    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    try {
      const res = await updatePassword(data).unwrap();

      dispatch(clearAuth());
      Cookies.remove("gydes_accessToken");

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
          duration: 2000,
        });
      }

      window.location.href = "/signin";
      window.location.reload();
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
    }

    console.log("Success:", values);
  };
  return (
    <div className="lg:w-[70%] my-20">
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="bg-transparent w-full"
      >
        <Typography.Title level={4} style={{ color: "#222222" }}>
          Current password
        </Typography.Title>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter your current password!",
            },
          ]}
          name="oldPassword"
          className="text-white "
        >
          <Input.Password
            placeholder="Enter your password"
            className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
          />
        </Form.Item>
        <Typography.Title level={4} style={{ color: "#222222" }}>
          New password
        </Typography.Title>
        <Form.Item
          rules={[
            { required: true, message: "Please enter your new password!" },
          ]}
          name="newPassword"
          className="text-white"
        >
          <Input.Password
            placeholder="Enter your password"
            className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
          />
        </Form.Item>
        <Typography.Title level={4} style={{ color: "#222222" }}>
          Re-enter new Password
        </Typography.Title>
        <Form.Item
          name="reEnterPassword"
          className="text-white"
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded mt-8"
            htmlType="submit"
          >
            Change password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
