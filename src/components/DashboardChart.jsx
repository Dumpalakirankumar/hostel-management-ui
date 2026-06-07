import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Hostels", value: 5 },
  { name: "Rooms", value: 120 },
  { name: "Beds", value: 450 },
  { name: "Residents", value: 380 },
];

const DashboardChart = () => {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#3B82F6"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;