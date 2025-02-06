import { Button, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import MyTable from "../ReuseCompo/MyTable";

const ReportsTable = ({ reportData, showViewReportModal, setPage }) => {
  const columns = [
    {
      title: "#UID",
      dataIndex: "UID",
      key: "UID",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "User Role",
      dataIndex: "userRole",
      key: "userRole",
    },
    {
      title: "Comments",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Reported By",
      dataIndex: "reportedBy",
      key: "reportedBy",
    },
    {
      title: "Action",
      key: "action",
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
