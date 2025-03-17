/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { toast } from "sonner";
import { useUpdateWithdrawMutation } from "../../redux/features/withdraw/withdrawApi";

const AcceptWithdrawModal = ({
  isAcceptModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [acceptWithdraw] = useUpdateWithdrawMutation();
  const handleAccept = async () => {
    const toastId = toast.loading("Accepting request...");
    try {
      const res = await acceptWithdraw({
        id: currentRecord?._id,
        data: {
          status: "Approved",
        },
      }).unwrap();

      toast.success(res.message, {
        id: toastId,
        duration: 2000,
      });
      handleCancel();
    } catch (error) {
      toast.error(error?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Modal
      // title="Confirm Delete"
      open={isAcceptModalVisible}
      onOk={handleAccept}
      onCancel={handleCancel}
      okText="block"
      cancelText="Cancel"
      centered
      style={{ textAlign: "center" }}
      // styles.body={{ textAlign: "center" }}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "40px",
            marginTop: "30px",
          }}
        >
          <Button
            className="text-xl py-5 px-8 !text-base-color"
            type="primary"
            onClick={handleCancel}
            style={{
              marginRight: 12,
              background: "rgba(221, 221, 221, 1)",
            }}
          >
            Cancel
          </Button>
          <Button
            className="text-xl py-5 px-8"
            type="primary"
            style={{ background: "#0BAE54" }}
            onClick={() => handleAccept(currentRecord)}
          >
            Accept
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4">
        Do you want to accept this withdraw?
      </p>
    </Modal>
  );
};

export default AcceptWithdrawModal;
