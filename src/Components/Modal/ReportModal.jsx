/* eslint-disable react/prop-types */
import { Button, Modal, Rate } from "antd";
import { AllImages } from "../../../public/images/AllImages";
import { toast } from "sonner";
import {
  useBanUserMutation,
  useWarUserMutation,
} from "../../redux/features/reports/reportsApi";

const ReportModal = ({
  isReportViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [sendReportWarning] = useWarUserMutation();
  const [banUser] = useBanUserMutation();

  const sendWarning = async () => {
    Modal.confirm({
      title: "Are you sure you want to send a warning?",
      content: "This action will notify the user with a warning.",
      okText: "Yes, Send Warning",
      cancelText: "Cancel",
      okButtonProps: {
        style: {
          backgroundColor: "#ff8510",
          borderColor: "#ff8510",
          color: "white",
        },
      },
      onOk: async () => {
        const data = {
          recipient_id: currentRecord?._id,
          comment: currentRecord?.comment,
        };
        const toastId = toast.loading("Sending warning...");
        try {
          const res = await sendReportWarning({
            data,
            id: currentRecord?._id,
          }).unwrap();
          toast.success(res?.message, { id: toastId, duration: 2000 });
          handleCancel();
        } catch (error) {
          toast.error(
            error?.data?.message || error?.message || "Failed to send warning",
            { id: toastId, duration: 2000 }
          );
        }
      },
    });
  };

  const handleBan = async () => {
    Modal.confirm({
      title: "Are you sure you want to ban this user?",
      content: "This action cannot be undone.",
      okText: "Yes, Ban",
      cancelText: "Cancel",
      okButtonProps: {
        style: {
          backgroundColor: "#fc2e1c",
          borderColor: "#fc2e1c",
          color: "white",
        },
      },
      onOk: async () => {
        const data = {
          reportId: currentRecord?.reportId?._id,
          comment: currentRecord?.comment,
        };
        const toastId = toast.loading("Banning user...");
        try {
          const res = await banUser({ data, id: currentRecord?._id }).unwrap();
          toast.success(res?.message, { id: toastId, duration: 2000 });
          handleCancel();
        } catch (error) {
          toast.error(
            error?.data?.message || error?.message || "Failed to ban user",
            { id: toastId, duration: 2000 }
          );
        }
      },
    });
  };

  return (
    <Modal
      open={isReportViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[500px]"
    >
      <div className="p-5">
        <div className="">
          {currentRecord?.isBlocked === true ? (
            <p className="text-center text-lg font-bold mb-4 text-[#fc2e1c]">
              Already Banned
            </p>
          ) : currentRecord?.isWarned === true ? (
            <p className="text-center text-lg font-bold mb-4 text-[#ff8510]">
              Already Warned
            </p>
          ) : null}

          <div className="flex justify-center items-center p-4">
            {/* Avatar */}
            <img
              src={AllImages.user}
              alt={currentRecord?.userName}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4"
            />
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {currentRecord?.reportId?.fullName}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Rate
              allowHalf
              defaultValue={3.9}
              style={{ color: "#FF8510", fontSize: 16 }}
              disabled
            />
            <span>{3.9} Rating</span>
          </div>

          <div className="mt-2">
            <div className="text-lg text-start">
              <div className="flex justify-center items-center gap-2 mb-2">
                <div className=" font-medium ">Role: </div>
                <div className="text-secondary-color">
                  {currentRecord?.reportId?.role}
                </div>
              </div>

              <div className=" mb-2">
                <div className="text-start">
                  <span className=" font-medium ">Email: </span>
                  {currentRecord?.reportId?.email}
                </div>
              </div>

              <div className=" mb-2">
                <div className="text-start">
                  <span className=" font-medium ">Reason:</span>{" "}
                  {currentRecord?.comment}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-start">
                  <span className=" font-medium ">Report By:</span>{" "}
                  {currentRecord?.userId?.fullName}
                </div>
              </div>
              <div className=" mb-2">
                <div className="text-start pt-0 ">
                  <span className=" font-medium ">Comment: </span>
                  {currentRecord?.comment}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col md:flex-row justify-center items-center gap-3">
              {!(currentRecord?.isWarned || currentRecord?.isBlocked) && (
                <Button
                  onClick={sendWarning}
                  className="!bg-[#ff8510] !border-none !text-primary-color text-lg font-medium py-5"
                >
                  Warn Users
                </Button>
              )}
              {!currentRecord?.isBlocked && (
                <Button
                  onClick={handleBan}
                  className="!bg-[#fc2e1c] !border-none !text-primary-color text-lg font-medium py-5"
                >
                  Ban User
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
