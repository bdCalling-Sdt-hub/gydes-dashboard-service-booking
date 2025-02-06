import { Button, Modal } from "antd";

const EarningModal = ({
  isEarningViewModalVisible,
  handleCancel,
  //   currentRecord,
}) => {
  return (
    <Modal
      open={isEarningViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:!w-[500px]"
    >
      <div className="p-5">
        <div className="">
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
            Transaction Details
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl font-semibold">
            Payment Method : Credit Card
          </div>

          <div className="mt-5">
            <Button className="!bg-[#ea2918] !text-primary-color text-lg font-medium py-5">
              Refund Amount
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EarningModal;
