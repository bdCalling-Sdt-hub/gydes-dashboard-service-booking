import Area_Chart from "../../Chart/AreaChart";
import YearOption from "../../../utils/YearOption";
import { useState } from "react";
import { useGetUserYearStateQuery } from "../../../redux/features/overview/overviewApi";

const UserOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data, isFetching } = useGetUserYearStateQuery({ year });
  console.log(data);
  const userOverview = data?.data?.userOverview;

  console.log(year);
  return (
    <div
      className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="flex justify-between text-base-color mt-4">
        <p className="text-2xl lg:text-3xl font-bold mb-5">User Overview</p>
        <div>
          <YearOption currentYear={currentYear} setThisYear={setYear} />
        </div>
      </div>
      <div>
        <Area_Chart userOverview={userOverview} isFetching={isFetching} />
      </div>
    </div>
  );
};

export default UserOverview;
