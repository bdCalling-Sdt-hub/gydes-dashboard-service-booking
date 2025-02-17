import { Button } from "antd";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import AddSubscriptionModal from "./AddSubscriptionModal";
import UpdateSubscriptionModal from "./UpdateSubscriptionModal";
import SubscriptionCard from "./SubscriptionCard";
import DeleteSubscriptionModal from "./DeleteSubscriptionModal";
import { useGetSubscriptionQuery } from "../../../redux/features/subscription/subscriptionApi";
import Loading from "../../UI/Loading";

export default function Subscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data, isFetching } = useGetSubscriptionQuery();
  const subscription = data?.data;

  console.log("currentRecord", currentRecord);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showUpdateModal = (record) => {
    setCurrentRecord(record);
    setIsUpdateModalOpen(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleCancelUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentRecord(null);
  };

  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentRecord(null);
  };

  return (
    <div
      className=" min-h-screen py-4 px-4 sm:px-6 md:px-8 rounded-lg"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="w-full sm:w-[90%] mt-10 mx-auto">
        {" "}
        <div className="flex flex-col sm:flex-row justify-center gap-5 sm:justify-between items-center mb-20">
          <h1 className="text-3xl lg:text-4xl text-secondary-color font-semibold">
            Subscription
          </h1>
          <Button
            type="primary"
            onClick={showModal}
            className="flex items-center gap-1 sm:gap-3 !bg-secondary-color !text-primary-color h-10 font-semibold border-none"
          >
            <GoPlus className="text-xl text-primary-color" />
            <p className="text-xs sm:text-lg py-3">Add subscription</p>
          </Button>
        </div>
        <div className="flex flex-wrap flex-col md:flex-row justify-center items-center md:items-stretch  gap-20">
          {isFetching ? (
            <div>
              <Loading />
            </div>
          ) : (
            subscription?.map((sub, index) => (
              <SubscriptionCard
                key={index}
                sub={sub}
                showUpdateModal={showUpdateModal}
                showDeleteModal={showDeleteModal}
              />
            ))
          )}
        </div>
      </div>
      {isModalOpen && (
        <AddSubscriptionModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateSubscriptionModal
          isUpdateModalOpen={isUpdateModalOpen}
          handleCancelUpdateModal={handleCancelUpdateModal}
          currentRecord={currentRecord}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteSubscriptionModal
          isDeleteModalOpen={isDeleteModalOpen}
          handleCancelDeleteModal={handleCancelDeleteModal}
          currentRecord={currentRecord}
        />
      )}
    </div>
  );
}
