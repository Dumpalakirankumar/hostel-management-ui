import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const DashboardChart = ({
  hostels,
  rooms,
  beds,
  residents,
}) => {
  const data = [
    {
      name: "Hostels",
      value: hostels,
    },
    {
      name: "Rooms",
      value: rooms,
    },
    {
      name: "Beds",
      value: beds,
    },
    {
      name: "Residents",
      value: residents,
    },
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#3B82F6"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;