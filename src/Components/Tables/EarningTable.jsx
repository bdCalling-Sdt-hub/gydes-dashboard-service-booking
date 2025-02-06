import { Button, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import MyTable from "../ReuseCompo/MyTable";

const EarningTable = ({ earningData, showViewEarningModal, setPage }) => {
  const columns = [
    {
      title: "UID",
      dataIndex: "UID",
      key: "UID",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Premium Plan",
      dataIndex: "premiumPlan",
      key: "premiumPlan",
    },
    {
      title: "Amount ($)",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount, // Sorting by amount
      render: (text) => `$${text}`, // Optional: display amount with "$" symbol
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      sorter: (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate), // Sorting by purchase date
      render: (text) => new Date(text).toLocaleDateString(), // Optional: format the date for display
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Refunded", value: "Refunded" },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
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
            onClick={() => showViewEarningModal(record)}
          >
            <GoEye style={{ fontSize: "24px" }} />
          </Button>
        </Tooltip>
      ),
    },
  ];

  return <MyTable columns={columns} data={earningData} setPage={setPage} />;
};

export default EarningTable;
