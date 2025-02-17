import { useState } from "react";
import SearchInput from "../../ReuseCompo/SearchInput";
import ReportsTable from "../../Tables/ReportsTable";
import ReportModal from "../../Modal/ReportModal";
import { useGetReportsQuery } from "../../../redux/features/reports/reportsApi";

const AllReports = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;
  const [isReportViewModalVisible, setIsReportViewModalVisible] =
    useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data, isFetching } = useGetReportsQuery({
    page,
    searchTerm: searchText,
    limit,
  });
  const allReport = data?.data;
  const total = data?.meta?.total;

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
          setPage={setPage}
        />
      </div>

      <ReportsTable
        reportData={allReport}
        showViewReportModal={showViewReportModal}
        setPage={setPage}
        loading={isFetching}
        total={total}
        limit={limit}
        page={page}
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
