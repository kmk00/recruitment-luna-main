import { HistoricalData } from "../../types.global";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./HistoricalDataCharts.module.css";
const HistoricalDataCharts = ({ data, mode }: HistoricalData) => {
  const chartData = data.map((item) => ({
    date:
      mode === "hourly"
        ? new Date(item.timestamp).toLocaleString()
        : new Date(item.timestamp).toLocaleDateString().split(",")[0],
    temperature: item.temperature,
  }));

  return (
    <ResponsiveContainer
      width="100%"
      height={250}
      className={`${styles["historical-data"]} glass`}
    >
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" hide />
        <YAxis dataKey="temperature" domain={["auto", "auto"]} />
        <Tooltip
          contentStyle={{ backgroundColor: "black", color: "white" }}
          formatter={(value: number) => ` ${value} °C`}
          labelFormatter={(label: string) => "Date: " + label}
        />
        <Legend />
        <Line
          type="monotone"
          name="Temperature"
          dataKey="temperature"
          stroke="#6dc5c0"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoricalDataCharts;
