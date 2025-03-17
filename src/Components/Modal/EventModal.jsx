/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { formatJoinDate } from "../../utils/dateFormet";
import { getImageUrl } from "../../helpers/config/envConfig";
import { toast } from "sonner";
import { useDeleteEventMutation } from "../../redux/features/events/eventsApi";

const EventModal = ({
  isEventViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [deleteEvent] = useDeleteEventMutation();
  const imageApiUrl = getImageUrl();
  const eventImage = imageApiUrl + currentRecord?.bannerImage;

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting...");
    try {
      const res = await deleteEvent({ id });
      console.log(res);
      toast.success(res?.data?.message, {
        id: toastId,
        duration: 2000,
      });
      handleCancel();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Failed to delete event", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Modal
      open={isEventViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5">
        <div className="">
          <div className="flex justify-center items-center">
            {/* Avatar */}
            <img
              src={eventImage}
              alt={currentRecord?.eventName}
              className="w-full h-60 object-cover object-top rounded-lg"
            />
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {currentRecord?.eventName}
          </div>
          <div className="flex items-center justify-center gap-2 text-xl my-5">
            <span className="font-semibold">Status : </span>{" "}
            <span
              className={`${
                currentRecord?.status === "active"
                  ? "text-secondary-color"
                  : "text-red-600"
              }`}
            >
              {currentRecord?.status}
            </span>
          </div>
          <div className="mt-2">
            <div className="text-lg ">
              <div className="flex  items-center gap-2 mb-2">
                <div className=" font-medium ">Date: </div>
                <div className="text-secondary-color">
                  {formatJoinDate(currentRecord?.date)}
                </div>
              </div>

              <div className="flex  items-center  gap-2 mb-2">
                <div className=" font-medium ">Time:</div>
                <div>{currentRecord?.time}</div>
              </div>

              <div className="flex  items-center  gap-2 mb-2">
                <div className=" font-medium ">Location:</div>
                <div>{currentRecord?.address}</div>
              </div>

              <div className="flex flex-col  gap-2 mb-5">
                <div className=" font-medium ">Host:</div>
                <div className="text-justify pt-0 ">
                  <div className="bg-secondary-color/10 p-2 rounded w-fit flex items-center gap-1 mt-2">
                    <img
                      src={imageApiUrl + currentRecord?.createdBy?.image}
                      alt=""
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <div className="">
                      <p className="font-medium text-sm">
                        {currentRecord?.createdBy?.fullName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col  gap-2 mb-4">
                <div className=" font-medium ">Co Host:</div>
                <div className="text-justify pt-0 ">
                  {currentRecord?.coHosts?.map((host, index) => (
                    <div
                      key={index}
                      className="bg-secondary-color/10 p-2 rounded w-fit flex items-center gap-1 mt-2"
                    >
                      <img
                        src={imageApiUrl + host?.image}
                        alt=""
                        className="w-8 h-8 object-cover rounded-full"
                      />
                      <div className="">
                        <p className="font-medium text-sm">{host?.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex  items-center  gap-2 mb-2">
                <div className=" font-medium ">Participants:</div>
                <div className="text-start pt-0 ">
                  {currentRecord?.maxParticipants}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex flex-col md:flex-row justify-center items-center gap-3">
              <Button
                onClick={() => handleDelete(currentRecord?._id)}
                className="!bg-[#fc2e1c] !border-none !text-primary-color text-lg font-medium py-5"
              >
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
