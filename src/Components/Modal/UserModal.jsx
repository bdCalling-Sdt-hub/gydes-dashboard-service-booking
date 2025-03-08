/* eslint-disable react/prop-types */
import { Button, Modal, Rate } from "antd";
import { getImageUrl } from "../../helpers/config/envConfig";
import { formatJoinDate } from "../../utils/dateFormet";
import { toast } from "sonner";
import { useVerifedUserMutation } from "../../redux/features/users/usersApi";
import { Link } from "react-router-dom";

const UserModal = ({ isUserViewModalVisible, handleCancel, currentRecord }) => {
  const [verifedUser] = useVerifedUserMutation();
  const imageApiUrl = getImageUrl();

  const profileImage = imageApiUrl + currentRecord?.image;

  const handleVerified = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to verify this user?",
      okText: "Yes, Verify",
      cancelText: "Cancel",
      okButtonProps: {
        style: {
          backgroundColor: "#0861c5 ",
          borderColor: "#0861c5 ",
          color: "white",
        },
      },
      onOk: async () => {
        const toastId = toast.loading("User verified...");

        try {
          const res = await verifedUser({ id });
          console.log(res);
          toast.success(res?.data?.message, {
            id: toastId,
            duration: 2000,
          });
          handleCancel();
        } catch (error) {
          console.log(error);
          toast.error("Failed to verify user", { id: toastId, duration: 2000 });
        }
      },
    });
  };

  return (
    <Modal
      open={isUserViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[500px]"
    >
      <div className="p-5">
        <div className="">
          <div className="flex justify-center items-center p-4">
            {/* Avatar */}
            <img
              src={profileImage}
              alt={currentRecord?.fullName}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4 border border-secondary-color"
            />
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {currentRecord?.fullName}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Rate
              allowHalf
              defaultValue={currentRecord?.rating}
              style={{ color: "#FF8510", fontSize: 16 }}
              disabled
            />
            <span>{currentRecord?.rating} Rating</span>
          </div>
          <div className="mt-2">
            <div className="text-lg text-center font-medium ">
              <div className="flex justify-center items-center gap-2 mb-2">
                <div className="">Role: </div>
                <div className="text-secondary-color">
                  {currentRecord?.role}
                </div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className="">Plan:</div>
                <div>{currentRecord?.isSubcription ? "Premium" : "Free"}</div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className="">Location:</div>
                <div>{currentRecord?.address}</div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className="">Joined:</div>
                <div className="text-justify pt-0 ">
                  {formatJoinDate(currentRecord?.createdAt)}
                </div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className="">Status:</div>
                <div className="text-justify pt-0 ">
                  {!currentRecord?.adminVerified ? (
                    <span className="text-[#ff766a]">Unverified</span>
                  ) : (
                    <span className="text-secondary-color">Verified</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col md:flex-row justify-center items-center gap-3">
              {!currentRecord?.adminVerified && (
                <Button
                  onClick={() => handleVerified(currentRecord?._id)}
                  className="!bg-secondary-color !text-primary-color text-lg font-medium py-5"
                >
                  Verify Profile
                </Button>
              )}
              {currentRecord?.document ? (
                <Link
                  target="_blank"
                  to={`${imageApiUrl + currentRecord?.document}`}
                >
                  <Button className="!bg-[#ff8510] !text-primary-color text-lg font-medium py-5">
                    View Documents
                  </Button>
                </Link>
              ) : (
                <div className="!bg-primary-color !text-[#ff8510] !border-none cursor-default text-lg font-medium py-5">
                  Documents Not Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
