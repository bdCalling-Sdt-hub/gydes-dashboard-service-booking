import { Button, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import MyTable from "../ReuseCompo/MyTable";
import { useDispatch } from "react-redux";
import {
  setIsSubcription,
  setRole,
  setStatus,
} from "../../redux/features/users/usersSlice";

const UserTable = ({
  loading,
  userData,
  showViewUserModal,
  setPage,
  total,
  limit,
  page,
}) => {
  const dispatch = useDispatch();

  // Check if filters should be displayed based on userData length
  const showFilters = userData?.length > 6;

  const columns = [
    {
      title: "UID",
      key: "_id",
      render: (_, __, index) => index + 1, // Display the index starting from 1
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: showFilters
        ? [
            { text: "Admin", value: "admin" },
            { text: "Seekers", value: "seeker" },
            { text: "Guide", value: "guide" },
          ]
        : null,
      filterMultiple: false,
    },
    {
      title: "Status",
      dataIndex: "adminVerified",
      key: "adminVerified",
      filters: showFilters
        ? [
            { text: "Unverified", value: "unverified" },
            { text: "Verified", value: "verified" },
          ]
        : null,
      filterMultiple: false,
      render: (adminVerified) =>
        adminVerified ? (
          <span className="text-secondary-color">Verified</span>
        ) : (
          <span className="text-[#ff766a]">Unverified</span>
        ),
    },
    {
      title: "User Type",
      dataIndex: "isSubcription",
      key: "isSubcription",
      filters: showFilters
        ? [
            { text: "Free", value: "free" },
            { text: "Premium", value: "premium" },
          ]
        : null,
      filterMultiple: false,
      render: (isSubcription) => (isSubcription ? "Premium" : "Free"),
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

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (pagination, filters, sorter) => {
    if (filters?.role) {
      dispatch(setRole(filters?.role[0] || ""));
    } else {
      dispatch(setRole(""));
    }
    if (filters?.adminVerified) {
      if (filters?.adminVerified[0] === "verified") {
        dispatch(setStatus(true));
      } else {
        dispatch(setStatus(false));
      }
    } else {
      dispatch(setStatus(""));
    }
    if (filters?.isSubcription) {
      if (filters?.isSubcription[0] === "premium") {
        dispatch(setIsSubcription(true));
      } else {
        dispatch(setIsSubcription(false));
      }
    } else {
      dispatch(setIsSubcription(""));
    }
  };

  return (
    <MyTable
      loading={loading}
      columns={columns}
      onChange={handleTableChange}
      data={userData}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
    />
  );
};

export default UserTable;
