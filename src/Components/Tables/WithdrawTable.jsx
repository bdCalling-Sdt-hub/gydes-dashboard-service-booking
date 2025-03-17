import { Button, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import MyTable from "../ReuseCompo/MyTable";
import { formatJoinDate } from "../../utils/dateFormet";
import { useDispatch } from "react-redux";
import {
  setPaymentGateway,
  setStatus,
} from "../../redux/features/withdraw/withdrawSlice";

const WithdrawTable = ({
  loading,
  withdrawData,
  showViewModal,
  showAcceptModal,
  showRejectModal,
  setPage,
  total,
  limit,
  page,
}) => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: "UID",
      dataIndex: "_id",
      render: (_, __, index) => index + 1,
      key: "uid",
    },
    {
      title: "Name",
      dataIndex: ["user", "fullName"],
      key: "name",
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: ["user", "phone"],
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: ["user", "role"],
      key: "role",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => formatJoinDate(createdAt),
      key: "data",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <div className="flex items-center gap-1">
            <span
              className={`${
                status === "Approved"
                  ? "text-green-600"
                  : status === "Rejected"
                  ? "text-red-600"
                  : "text-yellow-500"
              } font-semibold`}
            >
              {status}
            </span>
          </div>
        );
      },
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Approved", value: "Approved" },
        { text: "Rejected", value: "Rejected" },
      ],
      filterMultiple: false,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentGateway",
      key: "paymentGateway",
      align: "center",
      filters: [
        { text: "PayPal", value: "Paypal" },
        { text: "Bank", value: "Bank" },
      ],
      filterMultiple: false,
    },
    {
      title: "Payment Information",
      key: "paymentInformation",
      render: (_, record) => (
        <Tooltip placement="right" title="View Details">
          <Button
            className=" mx-auto flex items-center gap-1"
            style={{
              background: "#0861C5",
              border: "none",
              color: "#FFFFFF",
            }}
            onClick={() => showViewModal(record)} // You can replace this with your modal function
          >
            <GoEye style={{ fontSize: "24px" }} />
            <p>View</p>
          </Button>
        </Tooltip>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record?.status === "Pending" ? (
          <div className="flex justify-center items-center gap-2">
            <Tooltip placement="right" title="Accept">
              <Button
                className=""
                style={{
                  background: "#0BAE54",
                  border: "none",
                  color: "#FFFFFF",
                }}
                onClick={() => showAcceptModal(record)} // You can replace this with your modal function
              >
                Accept
              </Button>
            </Tooltip>
            <Tooltip placement="right" title="Reject">
              <Button
                className=""
                style={{
                  background: "#D80000",
                  border: "none !important",
                  color: "#FFFFFF",
                }}
                onClick={() => showRejectModal(record)} // You can replace this with your modal function
              >
                Reject
              </Button>
            </Tooltip>
          </div>
        ) : (
          <span
            className={`text-sm ${
              record?.status === "Approved"
                ? "text-green-600"
                : record?.status === "Rejected"
                ? "text-red-600"
                : "text-yellow-500"
            } `}
          >
            {record?.status}
          </span>
        ),
      align: "center",
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (pagination, filters, sorter) => {
    if (filters?.status) {
      dispatch(setStatus(filters?.status[0] || ""));
    } else {
      dispatch(setStatus(""));
    }
    if (filters?.paymentGateway) {
      dispatch(setPaymentGateway(filters?.paymentGateway[0] || ""));
    } else {
      dispatch(setPaymentGateway(""));
    }
  };

  return (
    <MyTable
      loading={loading}
      columns={columns}
      data={withdrawData}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      onChange={handleTableChange}
    />
  );
};

export default WithdrawTable;
