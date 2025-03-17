import { Modal } from "antd";
import dayjs from "dayjs";

const EarningModal = ({
  isEarningViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isEarningViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5">
        <div className="">
          <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center">
            Transaction Details
          </div>
          <div className="mt-10">
            <div className="flex flex-col justify-start sm:text-lg  gap-2 mb-2">
              <div className="font-semibold ">Transaction Id:</div>
              <div className="p-2 bg-secondary-color/10 rounded ">
                {currentRecord?.transactionId}
              </div>
            </div>
            <div className="flex flex-col justify-start sm:text-lg  gap-2 mb-2">
              <div className="font-semibold ">Payment Method:</div>
              <div className="p-2 bg-secondary-color/10 rounded ">
                {currentRecord?.paymentMethod}
              </div>
            </div>
            <div className="flex flex-col justify-start sm:text-lg  gap-2 mb-2">
              <div className="font-semibold ">Payment Type:</div>
              <div className="p-2 bg-secondary-color/10 rounded ">
                {currentRecord?.paymentType === "bookings"
                  ? "Commission"
                  : "Premium Service"}
              </div>
            </div>
            <div className="flex flex-col justify-start sm:text-lg  gap-2 mb-2">
              <div className="font-semibold ">Payment Date:</div>
              <div className="p-2 bg-secondary-color/10 rounded ">
                {dayjs(currentRecord?.createdAt).format("MM-DD-YYYY")}
              </div>
            </div>
          </div>

          {/* <div className="mt-5">
            <Button className="!bg-[#ea2918] !text-primary-color text-lg font-medium py-5">
              Refund Amount
            </Button>
          </div> */}
        </div>
      </div>
    </Modal>
  );
};

export default EarningModal;
