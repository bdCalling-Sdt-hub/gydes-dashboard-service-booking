import { useMemo, useState } from "react";
import SearchInput from "../../ReuseCompo/SearchInput";
import { Reports } from "../../../../public/data/Reports";
import ReportsTable from "../../Tables/ReportsTable";
import ReportModal from "../../Modal/ReportModal";

const AllReports = () => {
  const allReport = Reports;

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isReportViewModalVisible, setIsReportViewModalVisible] =
    useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  console.log(page);

  const filteredData = useMemo(() => {
    if (!searchText) return allReport;
    return allReport.filter((item) =>
      item?.Name?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, allReport]);

  const showViewReportModal = (record) => {
    setCurrentRecord(record);
    setIsReportViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsReportViewModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div
      className="mt-5 bg-primary-color rounded-xl p-4"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className=" flex items-center justify-between my-5">
        <p className="text-4xl mb-2 font-semibold text-base-color">Reports</p>

        <SearchInput
          placeholder="Search..."
          search={searchText}
          setSearch={setSearchText}
        />
      </div>

      <ReportsTable
        reportData={filteredData}
        showViewReportModal={showViewReportModal}
        setPage={setPage}
      />
      <ReportModal
        isReportViewModalVisible={isReportViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AllReports;
