import { useState } from "react";
import AddFAQ from "./AddFAQ";
import { Button } from "antd";
import { GoPlus } from "react-icons/go";
import Accordion from "../../UI/Accordion";
import UpdateFAQ from "./UpdateFAQ";
import DeleteFAQModal from "./DeleteFAQ";
import { useGetFaqQuery } from "../../../redux/features/faq/faqApi";
import Loading from "../../UI/Loading";

const FAQSection = () => {
  const { data, isFetching } = useGetFaqQuery();
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isFaqUpdateModalOpen, setIsFaqUpdateModalOpen] = useState(false);
  const [isFaqDeleteModalOpen, setIsFaqDeleteModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  console.log("currentRecord", currentRecord);

  const allFaq = data?.data;

  const showFaqModal = () => {
    setIsFaqModalOpen(true);
  };

  const showFaqUpdateModal = (record) => {
    setCurrentRecord(record);
    setIsFaqUpdateModalOpen(true);
  };

  const showFaqDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsFaqDeleteModalOpen(true);
  };

  const handleCancelFaqUpdateModal = () => {
    setIsFaqUpdateModalOpen(false);
    setCurrentRecord(null);
  };

  const handleCancelFaqDeleteModal = () => {
    setIsFaqDeleteModalOpen(false);
    setCurrentRecord(null);
  };
  return (
    <div
      className="min-h-screen  py-4 px-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div>
        <div className="w-full sm:w-[90%] mt-10 mx-auto">
          <div className="flex flex-col sm:flex-row justify-center gap-5 sm:justify-between items-center mb-20">
            <h1 className="text-3xl lg:text-4xl text-secondary-color font-semibold">
              FAQ
            </h1>
            <Button
              type="primary"
              onClick={showFaqModal}
              className="flex items-center gap-1 sm:gap-3 !bg-secondary-color !text-primary-color h-10 font-semibold border-none"
            >
              <GoPlus className="text-xl text-primary-color" />
              <p className="text-xs sm:text-lg py-3">Add FAQ</p>
            </Button>
          </div>

          <div>
            {isFetching ? (
              <div className="flex items-center justify-center min-h-[70vh]">
                <Loading />
              </div>
            ) : (
              allFaq?.map((item, index) => (
                <Accordion
                  key={index}
                  item={item}
                  className=""
                  showFaqUpdateModal={showFaqUpdateModal}
                  showFaqDeleteModal={showFaqDeleteModal}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {isFaqModalOpen && (
        <AddFAQ
          isFaqModalOpen={isFaqModalOpen}
          setIsFaqModalOpen={setIsFaqModalOpen}
        />
      )}
      {isFaqUpdateModalOpen && (
        <UpdateFAQ
          isFaqUpdateModalOpen={isFaqUpdateModalOpen}
          handleCancelFaqUpdateModal={handleCancelFaqUpdateModal}
          currentRecord={currentRecord}
        />
      )}
      {isFaqDeleteModalOpen && (
        <DeleteFAQModal
          isFaqDeleteModalOpen={isFaqDeleteModalOpen}
          handleCancelFaqDeleteModal={handleCancelFaqDeleteModal}
          currentRecord={currentRecord}
        />
      )}
    </div>
  );
};

export default FAQSection;
