/* eslint-disable no-unused-vars */
import React from "react";
import { FiBell } from "react-icons/fi";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetNotificationQuery } from "../../redux/features/overview/overviewApi";
import dayjs from "dayjs";
import { formatDateTime } from "../../utils/dateFormet";

const notifications = [
  { id: 1, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 2, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 3, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 4, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 5, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 6, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 7, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 8, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 9, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 10, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 11, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 12, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 13, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 14, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 15, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 16, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 17, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 18, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 19, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
  { id: 20, message: "A company added 6 Service Users.", time: "Fri, 12:30pm" },
];

const Notifications = () => {
  const { data: notificationData } = useGetNotificationQuery();
  console.log(notificationData);
  return (
    <div
      className=" bg-slate-50 min-h-[89vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center bg-secondary-color gap-1 py-3 px-5 mb-3 rounded-tl-xl rounded-tr-xl">
        <MdArrowBackIos
          className="text-xl sm:text-2xl lg:text-3xl text-primary-color cursor-pointer"
          onClick={() => window.history.back()}
        />

        <h1 className="text-3xl font-bold text-primary-color">Notification</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8 ">
        {notificationData?.data?.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center space-x-3 p-2 border-b border-gray-300 last:border-none"
          >
            {/* Icon */}
            <div className="bg-[#b8c1c3] p-2 rounded-full">
              <FiBell className="text-secondary-color w-6 h-6" />
            </div>

            {/* Notification text */}
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-700">
                {notification.title}
              </span>
              <span className="text-sm text-gray-500">
                {formatDateTime(notification?.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notifications;
