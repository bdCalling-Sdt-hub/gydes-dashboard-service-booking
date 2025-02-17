import { useState } from "react";
import UserModal from "../../Modal/UserModal";
import UserTable from "../../Tables/UserTable";
import SearchInput from "../../ReuseCompo/SearchInput";
import { useGetAllUsersQuery } from "../../../redux/features/users/usersApi";
import { useSelector } from "react-redux";
import {
  selectIsSubcription,
  selectRole,
  selectStatus,
} from "../../../redux/features/users/usersSlice";

const AllUsers = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;
  const role = useSelector(selectRole);
  const status = useSelector(selectStatus);
  const isSubcription = useSelector(selectIsSubcription);
  const [isUserViewModalVisible, setIsUserViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data, isFetching } = useGetAllUsersQuery({
    page,
    searchTerm: searchText,
    limit,
    role,
    status,
    isSubcription,
  });

  const allUser = data?.data;
  const total = data?.meta?.total;

  const showViewUserModal = (record) => {
    setCurrentRecord(record);
    setIsUserViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsUserViewModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div
      className="mt-5 bg-primary-color min-h-[90vh] rounded-xl p-4"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className=" flex items-center justify-between my-5">
        <p className="text-4xl mb-2 font-semibold text-base-color">Users</p>

        <SearchInput
          placeholder="Search User..."
          search={searchText}
          setSearch={setSearchText}
          setPage={setPage}
        />
      </div>

      <UserTable
        loading={isFetching}
        userData={allUser}
        showViewUserModal={showViewUserModal}
        setPage={setPage}
        total={total}
        limit={limit}
        page={page}
      />
      <UserModal
        isUserViewModalVisible={isUserViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AllUsers;
