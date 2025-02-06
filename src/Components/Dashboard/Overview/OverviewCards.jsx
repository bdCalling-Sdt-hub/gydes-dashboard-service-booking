import { FaUserTie } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { RiUserSearchFill } from "react-icons/ri";

const data = [
  {
    id: 1,
    name: "Total Users",
    icon: <HiUserGroup className="h-10 w-10 text-secondary-color" />,
    count: 10000,
  },
  {
    id: 2,
    name: "Seekers",
    icon: <RiUserSearchFill className="h-10 w-10 text-secondary-color" />,
    count: 4000,
  },
  {
    id: 3,
    name: "Guide",
    icon: <FaUserTie className="h-10 w-10 text-secondary-color" />,
    count: 6000,
  },
];

const OverviewCard = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-1 lg:gap-5 mb-5">
      {/* Company  */}
      {data.map((item) => (
        <div
          key={item.id}
          className="flex  rounded-2xl bg-primary-color py-6 px-3 my-2 lg:my-0 items-center justify-center flex-1"
          style={{ boxShadow: "0px 3px 5px 2px #00000040" }}
        >
          <div className="flex items-center justify-between w-full gap-5 lg:gap-8 xl:gap-10 ">
            <div className=" w-fit ">
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#353535] mb-1  tracking-tight">
                {item.name}
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-800 capitalize tracking-wider">
                {item.count}
              </p>
            </div>
            <div className="bg-[#EFEBF8] p-5 rounded-3xl">{item.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCard;
