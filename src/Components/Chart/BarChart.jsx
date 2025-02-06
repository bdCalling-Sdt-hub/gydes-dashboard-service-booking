import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", uv: 80 },
  { name: "Feb", uv: 70 },
  { name: "Mar", uv: 50 },
  { name: "Apr", uv: 60 },
  { name: "May", uv: 30 },
  { name: "Jun", uv: 20 },
  { name: "Jul", uv: 45 },
  { name: "Aug", uv: 36 },
  { name: "Sep", uv: 53 },
  { name: "Oct", uv: 69 },
  { name: "Nov", uv: 78 },
  { name: "Dec", uv: 36 },
];

const Bar_Chart = () => {
  // Formatter function to add 'K' suffix to Y-axis values
  const yAxisTickFormatter = (value) => `${value}K`;

  // Custom tick style
  const tickStyle = { fill: "#222222" };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
          barCategoryGap={30} // Adjust the gap between bars if necessary
        >
          <XAxis dataKey="name" tick={{ ...tickStyle }} tickMargin={6} />
          <YAxis
            tickFormatter={yAxisTickFormatter}
            tick={{ ...tickStyle }}
            axisLine={{
              stroke: "#0861C5", // Y-axis line color
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
            tickMargin={16}
          />
          {/* Add several horizontal black lines using ReferenceLine */}
          <ReferenceLine y={10} stroke="#0c0c0c" />
          <ReferenceLine y={20} stroke="#0c0c0c" />
          <ReferenceLine y={30} stroke="#0c0c0c" />
          <ReferenceLine y={40} stroke="#0c0c0c" />
          <ReferenceLine y={50} stroke="#0c0c0c" />
          <ReferenceLine y={60} stroke="#0c0c0c" />
          <Bar
            dataKey="uv"
            fill="#0861C5" // Bar color
            barSize={20} // Width of each bar
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Bar_Chart;
