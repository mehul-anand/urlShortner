import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Location({ stats }) {
  const cityCount = stats.reduce((acc, curr) => {
    if (acc[curr.city]) {
      acc[curr.city] += 1;
    } else {
      acc[curr.city] = 1;
    }
    return acc;
  }, {});
  const cities = Object.entries(cityCount).map(([city, count]) => {
    city, count;
  });
  return (
    <div className="w-full h-[300px] mt-10">
      <ResponsiveContainer>
        <LineChart width={700} height={300} data={cities.slice(0,5)}>
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip labelStyle={{ color: "#846eee" }} />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
