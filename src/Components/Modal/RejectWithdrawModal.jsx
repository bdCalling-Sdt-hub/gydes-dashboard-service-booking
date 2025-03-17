/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { toast } from "sonner";
import { useUpdateWithdrawMutation } from "../../redux/features/withdraw/withdrawApi";

const RejectWithdrawModal = ({
  isRejectModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [rejectWithdraw] = useUpdateWithdrawMutation();
  const handleReject = async () => {
    const toastId = toast.loading("Rejecting request...");
    try {
      const res = await rejectWithdraw({
        id: currentRecord?._id,
        data: {
          status: "Rejected",
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
      open={isRejectModalVisible}
      onOk={handleReject}
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
            style={{ background: "#D80000" }}
            onClick={() => handleReject(currentRecord)}
          >
            Reject
          </Button>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4">
        Do you want to reject this withdraw?
      </p>
    </Modal>
  );
};

export default RejectWithdrawModal;
