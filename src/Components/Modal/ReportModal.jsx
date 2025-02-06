/* eslint-disable react/prop-types */
import { Button, Modal, Rate } from "antd";
import { AllImages } from "../../../public/images/AllImages";

const ReportModal = ({
  isReportViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
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
          <div className="flex justify-center items-center p-4">
            {/* Avatar */}
            <img
              src={AllImages.user}
              alt={currentRecord?.userName}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4"
            />
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {currentRecord?.userName}
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
            <div className="text-lg text-center">
              <div className="flex justify-center items-center gap-2 mb-2">
                <div className=" font-medium ">Role: </div>
                <div className="text-secondary-color">
                  {currentRecord?.userRole}
                </div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className=" font-medium ">Email:</div>
                <div>{currentRecord?.email}</div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className=" font-medium ">Reason:</div>
                <div>{currentRecord?.reason}</div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className=" font-medium ">Report By:</div>
                <div className="text-justify pt-0 ">
                  {currentRecord?.reportedBy}
                </div>
              </div>
              <div className="flex justify-start items-stretch  gap-2 mb-2">
                <div className=" font-medium ">Comment:</div>
                <div className="text-start pt-0 ">{currentRecord?.comment}</div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col md:flex-row justify-center items-center gap-3">
              <Button className="!bg-[#ff8510] !border-none !text-primary-color text-lg font-medium py-5">
                Warn Users
              </Button>
              <Button className="!bg-[#fc2e1c] !border-none !text-primary-color text-lg font-medium py-5">
                Ban User
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReportModal;
