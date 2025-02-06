import { Button, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import MyTable from "../ReuseCompo/MyTable";

const UserTable = ({ userData, showViewUserModal, setPage }) => {
  const columns = [
    {
      title: "UID",
      dataIndex: "UID",
      key: "UID",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "Gender",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Phone No",
      dataIndex: "PhoneNo",
      key: "PhoneNo",
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "Role",
      filters: [
        { text: "Seekers", value: "Seekers" },
        { text: "Guide", value: "Guide" },
      ],
      onFilter: (value, record) => record.Role.indexOf(value) === 0,
    },
    {
      title: "User Type",
      dataIndex: "Plan",
      key: "Plan",
      filters: [
        { text: "Normal", value: "Normal" },
        { text: "Premium", value: "Premium" },
      ],
      onFilter: (value, record) => record.Plan.indexOf(value) === 0,
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
            onClick={() => showViewUserModal(record)}
          >
            <GoEye style={{ fontSize: "24px" }} />
          </Button>
        </Tooltip>
      ),
      align: "center",
    },
  ];
  return <MyTable columns={columns} data={userData} setPage={setPage} />;
};

export default UserTable;
