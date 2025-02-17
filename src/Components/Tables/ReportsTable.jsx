import { Button, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import MyTable from "../ReuseCompo/MyTable";

const ReportsTable = ({ reportData, showViewReportModal, setPage }) => {
  const columns = [
    {
      title: "#UID",
      render: (_, __, index) => index + 1,
      key: "_id",
    },
    {
      title: "User Name",
      dataIndex: ["reportId", "fullName"],
      key: "_id",
    },
    {
      title: "User Role",
      dataIndex: ["reportId", "role"],
      key: "_id",
    },
    {
      title: "Comments",
      dataIndex: "comment",
      key: "_id",
    },
    {
      title: "Reported By",
      dataIndex: ["userId", "fullName"],
      key: "_id",
    },
    {
      title: "Action",
      key: "_id",
      render: (_, record) => (
        <Tooltip placement="right" title="View Details">
          <Button
            className="!p-0"
            style={{
              background: "#FFFFFF",
              border: "none",
              color: "#0861C5",
            }}
            onClick={() => showViewReportModal(record)} // Assuming you have a modal for viewing details
          >
            <GoEye style={{ fontSize: "24px" }} />
          </Button>
        </Tooltip>
      ),
    },
  ];

  return <MyTable columns={columns} data={reportData} setPage={setPage} />;
};

export default ReportsTable;
