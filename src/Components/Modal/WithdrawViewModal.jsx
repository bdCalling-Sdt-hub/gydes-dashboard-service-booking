/* eslint-disable react/prop-types */
import { Modal } from "antd";

const WithdrawViewModal = ({ isModalVisible, handleCancel, currentRecord }) => {
  console.log("currentRecord", currentRecord);
  return (
    <Modal
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5">
        <div className="">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center">
            {currentRecord?.paymentGateway === "Bank"
              ? "Bank Information"
              : "PayPal Information"}
          </h1>
          <div className="mt-5">
            <div className="text-lg text-start ">
              {currentRecord?.paymentGateway === "Bank" ? (
                <div>
                  <div className="flex flex-col justify-start   gap-2 mb-2">
                    <div className="font-semibold ">Payment Gateway:</div>
                    <div className="p-2 bg-secondary-color/10 rounded ">
                      {currentRecord?.paymentGateway}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start   gap-2 mb-2">
                    <div className="font-semibold ">Bank Name:</div>
                    <div className="p-2 bg-secondary-color/10 rounded ">
                      {currentRecord?.bankInfo?.bankName}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start   gap-2 mb-2">
                    <div className="font-semibold ">Account Number:</div>
                    <div className="p-2 bg-secondary-color/10 rounded ">
                      {currentRecord?.bankInfo?.accountNumber}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start   gap-2 mb-2">
                    <div className="font-semibold ">Account Type:</div>
                    <div className="p-2 bg-secondary-color/10 rounded ">
                      {currentRecord?.bankInfo?.accountNumber}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start   gap-2 mb-2">
                    <div className="font-semibold ">Cedula Name:</div>
                    <div className="p-2 bg-secondary-color/10 rounded ">
                      {currentRecord?.bankInfo?.accountNumber}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col justify-start   gap-2 mb-2">
                    <div className="font-semibold">Account Name:</div>
                    <div className="p-2 bg-secondary-color/10 rounded ">
                      {currentRecord?.paypalInfo?.accountName}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start   gap-2 mb-2">
                    <div className="font-semibold">BSB Number:</div>
                    <div className="p-2 bg-secondary-color/10 rounded ">
                      {currentRecord?.paypalInfo?.bsbNumber}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start   gap-2 mb-2">
                    <div className="font-semibold">Account Number:</div>
                    <div className="p-2 bg-secondary-color/10 rounded ">
                      {currentRecord?.paypalInfo?.accountNumber}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start   gap-2 mb-2">
                    <div className="font-semibold">BIC Code:</div>
                    <div className="p-2 bg-secondary-color/10 rounded ">
                      {currentRecord?.paypalInfo?.bicCode}
                    </div>
                  </div>
                  <div className="flex flex-col justify-start   gap-2 mb-2">
                    <div className="font-semibold">Recipient Address:</div>
                    <div className="p-2 bg-secondary-color/10 rounded ">
                      {currentRecord?.paypalInfo?.recipientAddress}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawViewModal;
