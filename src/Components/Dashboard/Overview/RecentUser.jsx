import { useState } from "react";
import UserModal from "../../Modal/UserModal";
import UserTable from "../../Tables/UserTable";
import { useGetAllUsersQuery } from "../../../redux/features/users/usersApi";
const RecentUser = () => {
  const { data, isFetching } = useGetAllUsersQuery({});
  const recentUserData = data?.data.slice(0, 6);

  const [isRecentUserViewModalVisible, setIsRecentUserViewModalVisible] =
    useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewUserModal = (record) => {
    setCurrentRecord(record);
    setIsRecentUserViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsRecentUserViewModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div
      className="mt-10 bg-primary-color rounded-xl p-4"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className="flex justify-between items-center mx-3 py-2">
        <p className="text-2xl mb-2 font-bold text-base-color">Recent Users</p>
      </div>

      <UserTable
        loading={isFetching}
        userData={recentUserData}
        showViewUserModal={showViewUserModal}
      />
      <UserModal
        isUserViewModalVisible={isRecentUserViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default RecentUser;
