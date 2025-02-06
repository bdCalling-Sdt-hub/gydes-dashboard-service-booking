/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { AllImages } from "../../../public/images/AllImages";

const EventModal = ({
  isEventViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isEventViewModalVisible}
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
              src={AllImages.yellow}
              alt={currentRecord?.userName}
              className="w-12 h-12 sm:w-16  sm:h-16 rounded-lg mr-4"
            />
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {currentRecord?.eventName}
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>Status : Upcoming</span>
          </div>
          <div className="mt-2">
            <div className="text-lg text-center">
              <div className="flex justify-center items-center gap-2 mb-2">
                <div className=" font-medium ">Date: </div>
                <div className="text-secondary-color">
                  {currentRecord?.date}
                </div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className=" font-medium ">Time:</div>
                <div>{currentRecord?.time}</div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className=" font-medium ">Location:</div>
                <div>{currentRecord?.location}</div>
              </div>

              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className=" font-medium ">Host:</div>
                <div className="text-justify pt-0 ">{currentRecord?.host}</div>
              </div>
              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className=" font-medium ">Co Host:</div>
                <div className="text-justify pt-0 ">
                  {currentRecord?.coHost}
                </div>
              </div>
              <div className="flex justify-center items-center  gap-2 mb-2">
                <div className=" font-medium ">Participants:</div>
                <div className="text-start pt-0 ">
                  {currentRecord?.participants}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col md:flex-row justify-center items-center gap-3">
              <Button className="!bg-[#fc2e1c] !border-none !text-primary-color text-lg font-medium py-5">
                Cancel Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
