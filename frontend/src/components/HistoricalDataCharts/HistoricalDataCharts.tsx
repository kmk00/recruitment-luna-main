import { HistoricalData } from "../../types.global";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import styles from "./HistoricalDataCharts.module.css";
const HistoricalDataCharts = ({ data, mode, start, stop }: HistoricalData) => {
  const chartData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleString(),
    temperature: item.temperature,
  }));

  return (
    <div className={styles["historical-data"]}>
      <LineChart
        width={730}
        height={250}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" scale="auto" domain={["auto", "auto"]} />
        <YAxis dataKey="temperature" scale="auto" domain={["auto", "auto"]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          label="Temperature"
          stroke="#8884d8"
        />
      </LineChart>
    </div>
  );
};

export default HistoricalDataCharts;
