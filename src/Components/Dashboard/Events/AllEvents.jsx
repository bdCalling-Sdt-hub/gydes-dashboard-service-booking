import { useState } from "react";
import SearchInput from "../../ReuseCompo/SearchInput";
import EventsTable from "../../Tables/EventsTable";
import EventModal from "../../Modal/EventModal";
import { useGetAllEventsQuery } from "../../../redux/features/events/eventsApi";

const AllEvents = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;
  const [isEventViewModalVisible, setIsEventViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data, isFetching } = useGetAllEventsQuery({
    page,
    searchTerm: searchText,
    limit,
  });

  const allEvents = data?.data?.events;
  const total = data?.data?.meta?.total;

  const showViewEventModal = (record) => {
    setCurrentRecord(record);
    setIsEventViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsEventViewModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div
      className="mt-5 bg-primary-color min-h-[90vh] rounded-xl p-4"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className=" flex items-center justify-between my-5">
        <p className="text-4xl mb-2 font-semibold text-base-color">Events</p>

        <SearchInput
          placeholder="Search..."
          search={searchText}
          setSearch={setSearchText}
          setPage={setPage}
        />
      </div>

      <EventsTable
        loading={isFetching}
        eventsData={allEvents}
        showViewEventModal={showViewEventModal}
        setPage={setPage}
        total={total}
        limit={limit}
        page={page}
      />
      <EventModal
        isEventViewModalVisible={isEventViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AllEvents;
