import { useState } from "react";
import WithdrawTable from "../../Tables/WithdrawTable";
import WithdrawViewModal from "../../Modal/WithdrawViewModal";
import AcceptWithdrawModal from "../../Modal/AcceptWithdrawModal";
import RejectWithdrawModal from "../../Modal/RejectWithdrawModal";
import { useGetWithdrawQuery } from "../../../redux/features/withdraw/withdrawApi";
import { useSelector } from "react-redux";
import {
  selectPaymentGateway,
  selectStatus,
} from "../../../redux/features/withdraw/withdrawSlice";

const WithdrawSection = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const status = useSelector(selectStatus);
  const paymentGateway = useSelector(selectPaymentGateway);
  const [isWithdrawViewModalVisible, setIsWithdrawViewModalVisible] =
    useState(false);
  const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data, isFetching } = useGetWithdrawQuery({
    page,
    limit,
    status,
    paymentGateway,
  });

  const withdrawData = data?.data?.WithdrawRequests;
  const total = data?.data?.pagination?.totalResults;

  const showViewWithdrawModal = (record) => {
    setCurrentRecord(record);
    setIsWithdrawViewModalVisible(true);
  };

  const showAcceptModal = (record) => {
    setCurrentRecord(record);
    setIsAcceptModalVisible(true);
  };

  const showRejectModal = (record) => {
    setCurrentRecord(record);
    setIsRejectModalVisible(true);
  };

  const handleCancel = () => {
    setIsWithdrawViewModalVisible(false);
    setIsAcceptModalVisible(false);
    setIsRejectModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div
      className="mt-5 bg-primary-color min-h-[90vh] rounded-xl p-4"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className=" flex items-center justify-between my-5">
        <p className="text-4xl mb-2 font-semibold text-base-color">Withdraw</p>
      </div>

      <WithdrawTable
        loading={isFetching}
        withdrawData={withdrawData}
        showViewModal={showViewWithdrawModal}
        showAcceptModal={showAcceptModal}
        showRejectModal={showRejectModal}
        setPage={setPage}
        total={total}
        limit={limit}
        page={page}
      />
      <WithdrawViewModal
        isModalVisible={isWithdrawViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <AcceptWithdrawModal
        isAcceptModalVisible={isAcceptModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <RejectWithdrawModal
        isRejectModalVisible={isRejectModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default WithdrawSection;
