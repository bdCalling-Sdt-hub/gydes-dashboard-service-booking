import { useState } from "react";
import EarningTable from "../../Tables/EarningTable";
import EarningModal from "../../Modal/EarningModal";
import { useGetPaymentQuery } from "../../../redux/features/payment/paymentApi";
import {
  selectPayment,
  selectPaymentType,
} from "../../../redux/features/payment/paymentSlice";
import { useSelector } from "react-redux";

const AllEarning = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const amount = useSelector(selectPayment);
  const paymentType = useSelector(selectPaymentType);
  const { data, isFetching } = useGetPaymentQuery({
    page,
    limit,
    amount,
    paymentType,
  });

  const transactionsData = data?.data?.payments;
  const total = data?.data?.pagination?.totalResults;
  const [isEarningViewModalVisible, setIsEarningViewModalVisible] =
    useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewEarningModal = (record) => {
    setCurrentRecord(record);
    setIsEarningViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsEarningViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div
      className="mt-5 bg-primary-color rounded-xl p-4"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className=" flex items-center justify-between my-5">
        <p className="text-4xl mb-2 font-semibold text-base-color">
          Transactions
        </p>
      </div>

      <EarningTable
        transactionsData={transactionsData}
        loading={isFetching}
        showViewEarningModal={showViewEarningModal}
        setPage={setPage}
        total={total}
        limit={limit}
        page={page}
      />
      <EarningModal
        isEarningViewModalVisible={isEarningViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AllEarning;
