import { Button, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import MyTable from "../ReuseCompo/MyTable";
import { formatJoinDate } from "../../utils/dateFormet";

const EventsTable = ({
  loading,
  eventsData,
  showViewEventModal,
  setPage,
  total,
  limit,
  page,
}) => {
  const columns = [
    {
      title: "Event Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => formatJoinDate(date),
    },
    {
      title: "Location",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Host",
      dataIndex: ["createdBy", "fullName"],
      key: "host",
    },
    {
      title: "Participants",
      dataIndex: "maxParticipants",
      key: "maxParticipants",
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
            onClick={() => showViewEventModal(record)} // You can replace this with your modal function
          >
            <GoEye style={{ fontSize: "24px" }} />
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <MyTable
      loading={loading}
      columns={columns}
      data={eventsData}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
    />
  );
};

export default EventsTable;
