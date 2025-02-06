import { useMemo, useState } from "react";

import EarningTable from "../../Tables/EarningTable";
import SearchInput from "../../ReuseCompo/SearchInput";
import { Earrning } from "../../../../public/data/Earning";
import EarningModal from "../../Modal/EarningModal";

const AllEarning = () => {
  const earningData = Earrning;

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isEarningViewModalVisible, setIsEarningViewModalVisible] =
    useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  console.log(page);

  const filteredData = useMemo(() => {
    if (!searchText) return earningData;
    return earningData.filter((item) =>
      item?.userName?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, earningData]);

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
        <p className="text-4xl mb-2 font-semibold text-base-color">Earning</p>
        <SearchInput
          placeholder="Search..."
          search={searchText}
          setSearch={setSearchText}
        />
      </div>

      <EarningTable
        earningData={filteredData}
        showViewEarningModal={showViewEarningModal}
        setPage={setPage}
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
