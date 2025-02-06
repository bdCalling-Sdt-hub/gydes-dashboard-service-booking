import { ConfigProvider, Select } from "antd";
import { useEffect, useState } from "react";

const YearOption = ({ currentYear, setThisYear }) => {
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    const startYear = 2020;
    const yearRange = [];

    // Add the next 3 years to the list
    for (let i = startYear; i <= currentYear; i++) {
      yearRange.push({ value: i.toString(), label: i.toString() });
    }

    setYearOptions(yearRange);
  }, [currentYear]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            fontSize: 16,
            colorBorder: "#000000",
            colorText: "#000000",
          },
        },
      }}
    >
      <Select
        defaultValue={currentYear >= 2025 ? "2025" : currentYear.toString()}
        style={{ width: 100 }}
        options={yearOptions}
        onChange={(value) => setThisYear(value)}
      />
    </ConfigProvider>
  );
};

export default YearOption;
