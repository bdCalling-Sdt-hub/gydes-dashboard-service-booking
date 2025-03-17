import { BarsOutlined, BellFilled } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import { getImageUrl } from "../../helpers/config/envConfig";
import { useGetNotificationQuery } from "../../redux/features/overview/overviewApi";
import { formatDateTime } from "../../utils/dateFormet";

const Topbar = ({ collapsed, setCollapsed }) => {
  const { data, isFetching } = useGetProfileQuery();

  const { data: notificationData } = useGetNotificationQuery();
  const imageApiUrl = getImageUrl();
  const profileData = data?.data?.result;
  const profileImage = imageApiUrl + profileData?.image;

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      {notificationData?.data?.slice(0, 6)?.map((notification) => (
        <div className="test-start" key={notification.id}>
          <div className="flex gap-2">
            <BellFilled style={{ color: "#0861C5" }} />
            <div className="flex flex-col items-start">
              <p>{notification?.title}</p>
              <p className="text-gray-400">
                {formatDateTime(notification?.created_at)}
              </p>
            </div>
          </div>
        </div>
      ))}
      <Link
        to={`/admin/notifications`}
        className="w-20 mx-auto bg-secondary-color !text-primary-color rounded h-8 py-1"
      >
        See More
      </Link>
    </div>
  );
  return (
    <div className="py-2 mt-2 mx-[-40px] flex justify-between items-center bg-secondary-color rounded-full">
      <div className="flex items-center gap-2 text-primary-color ml-4">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl"
        />
      </div>
      <div className="flex items-center justify-center mr-5 gap-5">
        <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <BellFilled
            shape="circle"
            size="small"
            className="bg-[#F7F5F5] py-[18px] px-2 text-xl rounded-full shadow h-6 font-bold text-secondary-color border border-[#8D969B]"
          />
        </Dropdown>
        <div>
          {isFetching ? (
            <div className="flex w-32 h-full justify-center items-center p-4  mr-5 ">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-secondary-color"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <Link to="profile">
              <div className="flex items-center justify-center gap-0 bg-white text-base-color rounded-lg  px-2 py-1  border border-[#8D969B] mr-5">
                <img
                  src={profileImage}
                  alt="profile_pic"
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                  className="rounded-full border border-secondary-color object-cover"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-base-color font-semibold text-sm">
                    {profileData?.fullName}
                  </p>
                  <p className="text-base-color text-xs">{profileData?.role}</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Topbar;
