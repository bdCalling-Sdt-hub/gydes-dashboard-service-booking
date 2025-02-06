import { Button, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import MyTable from "../ReuseCompo/MyTable";

const EventsTable = ({ eventsData, showViewEventModal, setPage }) => {
  const columns = [
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Host",
      dataIndex: "host",
      key: "host",
    },
    {
      title: "Co-host",
      dataIndex: "coHost",
      key: "coHost",
    },
    {
      title: "Participants",
      dataIndex: "participants",
      key: "participants",
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

  return <MyTable columns={columns} data={eventsData} setPage={setPage} />;
};

export default EventsTable;
