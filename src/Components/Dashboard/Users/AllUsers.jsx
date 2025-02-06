import { useMemo, useState } from "react";
import { userData } from "../../../../public/data/Users";
import UserModal from "../../Modal/UserModal";
import UserTable from "../../Tables/UserTable";
import SearchInput from "../../ReuseCompo/SearchInput";

const AllUsers = () => {
  const allUser = userData;

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isUserViewModalVisible, setIsUserViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  console.log(page);

  const filteredData = useMemo(() => {
    if (!searchText) return allUser;
    return allUser.filter((item) =>
      item?.Name?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, allUser]);

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
      className="mt-5 bg-primary-color rounded-xl p-4"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className=" flex items-center justify-between my-5">
        <p className="text-4xl mb-2 font-semibold text-base-color">Users</p>

        <SearchInput
          placeholder="Search User..."
          search={searchText}
          setSearch={setSearchText}
        />
      </div>

      <UserTable
        userData={filteredData}
        showViewUserModal={showViewUserModal}
        setPage={setPage}
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
