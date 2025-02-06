import { useMemo, useState } from "react";
import SearchInput from "../../ReuseCompo/SearchInput";
import { events } from "../../../../public/data/Event";
import EventsTable from "../../Tables/EventsTable";
import EventModal from "../../Modal/EventModal";

const AllEvents = () => {
  const allEvents = events;

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [isEventViewModalVisible, setIsEventViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  console.log(page);

  const filteredData = useMemo(() => {
    if (!searchText) return allEvents;
    return allEvents.filter((item) =>
      item?.Name?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, allEvents]);

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
      className="mt-5 bg-primary-color rounded-xl p-4"
      style={{ boxShadow: "0px 0px 5px 1px #00000040" }}
    >
      <div className=" flex items-center justify-between my-5">
        <p className="text-4xl mb-2 font-semibold text-base-color">Events</p>

        <SearchInput
          placeholder="Search..."
          search={searchText}
          setSearch={setSearchText}
        />
      </div>

      <EventsTable
        eventsData={filteredData}
        showViewEventModal={showViewEventModal}
        setPage={setPage}
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
