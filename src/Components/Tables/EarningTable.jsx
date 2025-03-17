import { Button, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import MyTable from "../ReuseCompo/MyTable";
import { useDispatch } from "react-redux";
import {
  setPayment,
  setPaymentType,
} from "../../redux/features/payment/paymentSlice";

const EarningTable = ({
  transactionsData,
  loading,
  showViewEarningModal,
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
      key: "UID",
    },
    {
      title: "Seeker",
      dataIndex: ["user_id", "fullName"],
      key: "seekerName",
    },
    {
      title: "Guide",
      dataIndex: ["guide_id", "fullName"],
      key: "guideName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
      render: (text) => `$${text}`,
    },
    {
      title: "Guide Earning ($)",
      dataIndex: "netAmount",
      key: "netAmount",
      render: (text, record) => (record?.user_id ? `$${text}` : `-`),
    },
    {
      title: "Admin Earning ($)",
      dataIndex: "commission",
      key: "commission",
      // Sorting by amount
      render: (text, record) =>
        record?.paymentStatus !== "refunded" && `$${text}`,
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      key: "paymentType", //subscription
      filters: [
        {
          text: "Commission",
          value: "booking",
        },
        {
          text: "Premium Service",
          value: "subscription",
        },
      ],
      filterMultiple: false,
      render: (text) =>
        `${text === "booking" ? "Commission" : "Premium Service"}`,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text) =>
        text === "refunded" ? (
          <span className="text-red-500">Refunded</span>
        ) : (
          <span className="text-green-500">{text}</span>
        ),
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

  const handleTableChange = (pagination, filters, sorter) => {
    // Accessing the sort field and order (asc or desc)
    if (sorter.field === "amount") {
      sorter.order === "ascend"
        ? dispatch(setPayment("asc"))
        : sorter.order === "descend"
        ? dispatch(setPayment("desc"))
        : dispatch(setPayment(""));
    }
    if (filters?.paymentType) {
      const data = filters?.paymentType[0];
      dispatch(setPaymentType(data || ""));
    } else {
      dispatch(setPaymentType(""));
    }
  };

  return (
    <MyTable
      loading={loading}
      columns={columns}
      data={transactionsData}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyData="_id"
      onChange={handleTableChange}
    />
  );
};

export default EarningTable;
