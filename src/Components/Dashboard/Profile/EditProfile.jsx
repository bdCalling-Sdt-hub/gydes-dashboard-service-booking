/* eslint-disable no-unused-vars */
import { Button, ConfigProvider, Form, Input, Typography, Upload } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import { IoCameraOutline, IoChevronBackOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { decodedToken } from "../../../utils/jwt";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/features/profile/profileApi";
import Loading from "../../UI/Loading";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { toast } from "sonner";

const EditProfile = () => {
  const { data, isFetching } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const imageApiUrl = getImageUrl();
  const [form] = Form.useForm();

  const profileData = data?.data?.result;
  const profileImage = imageApiUrl + profileData?.image;
  const [imageUrl, setImageUrl] = useState(profileImage);

  useEffect(() => {
    if (profileData?.image) {
      setImageUrl(imageApiUrl + profileData.image); // Update image URL when profile data changes
    }
  }, [profileData, imageApiUrl]);

  useEffect(() => {
    form.setFieldsValue({
      fullName: profileData?.fullName,
      phone: profileData?.phone,
    });
  }, [form, profileData]);

  const handleImageUpload = (info) => {
    if (info.file.status === "removed") {
      setImageUrl(profileImage);
      form.setFieldsValue({ image: undefined });
    } else {
      const file = info.file.originFileObj;
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
        form.setFieldsValue({ image: file });
      }
    }
  };

  const onFinish = async (values) => {
    console.log(values);
    const formData = new FormData();
    const toastId = toast.loading("Profile updating...");

    if (values?.image) {
      formData.append("image", values?.image);
    }
    if (values?.fullName) {
      formData.append("fullName", values?.fullName);
    }
    if (values?.phone) {
      formData.append("phone", values?.phone);
    }

    try {
      const res = await updateProfile(formData).unwrap();

      if (res.success) {
        toast.success("Profile updated successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "An error occurred", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className=" lg:w-[70%] mx-auto">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="bg-transparent py-10 text-base-color w-full "
      >
        <div className="mt-5 flex flex-col justify-start items-start gap-x-4">
          <div className=" relative">
            <img
              className="h-40 w-40 relative rounded-full border border-secondary-color object-contain"
              src={imageUrl}
              alt=""
            />
            <Form.Item name="image">
              <Upload
                customRequest={(options) => {
                  setTimeout(() => {
                    options.onSuccess("ok");
                  }, 1000);
                }}
                onChange={handleImageUpload}
                maxCount={1}
                accept="image/*"
                listType="text"
                className="absolute -top-10 !right-3 text-end"
              >
                <Button
                  style={{
                    zIndex: 1,
                  }}
                  className="bg-white p-2 w-fit h-fit rounded-full shadow !border-none"
                >
                  <IoCameraOutline
                    className="w-5 h-5"
                    style={{ color: "#19363D" }}
                  />
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <p className="text-5xl font-semibold -mt-5">
            {profileData?.fullName}
          </p>
        </div>

        <div className=" text-white mt-5">
          <Typography.Title level={5} style={{ color: "#222222" }}>
            Email
          </Typography.Title>
          <Form.Item className="text-white ">
            <Input
              value={profileData?.email}
              disabled
              type="email"
              placeholder="Enter your email"
              className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
            />
          </Form.Item>
          <Typography.Title level={5} style={{ color: "#222222" }}>
            User Name
          </Typography.Title>
          <Form.Item name="fullName" className="text-white">
            <Input
              suffix={<MdOutlineEdit />}
              placeholder="Enter your Name"
              className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
            />
          </Form.Item>
          <Typography.Title level={5} style={{ color: "#222222" }}>
            Contact number
          </Typography.Title>
          <Form.Item name="phone" className="text-white">
            <Input
              suffix={<MdOutlineEdit />}
              placeholder="Enter your Contact number"
              className="py-2 px-3 text-xl border !border-input-color !text-base-color !bg-transparent"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
              htmlType="submit"
            >
              Save & Change
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default EditProfile;
