import { useState } from "react";
import YearOption from "../../../utils/YearOption";
import Bar_Chart from "../../Chart/BarChart";
import { usePaymentOverviewQuery } from "../../../redux/features/payment/paymentApi";

const IncomeOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { data: paymentOverview, isFetching } = usePaymentOverviewQuery({
    year,
  });

  console.log(year);
  return (
    <div
      className="w-full lg:w-1/2 p-3 bg-[#FFFFFF] rounded-lg flex flex-col"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="flex justify-between text-base-color mt-4">
        <p className="text-2xl lg:text-3xl font-bold mb-5">Income</p>
        <div>
          <YearOption currentYear={currentYear} setThisYear={setYear} />
        </div>
      </div>
      <hr />
      <div className="">
        <Bar_Chart paymentOverview={paymentOverview} isFetching={isFetching} />
      </div>
    </div>
  );
};

export default IncomeOverview;
