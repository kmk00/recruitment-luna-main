import { HistoricalData } from "../../types.global";
import styles from "./HistoricalDataTable.module.css";

const HistoricalDataTable = ({ data, mode, start, stop }: HistoricalData) => {
  return (
    <div className={styles["historical-data"]}>
      <p>Mode: {mode}</p>
      <p>Start: {new Date(start).toLocaleString()}</p>
      <p>Stop: {new Date(stop).toLocaleString()}</p>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Time</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((item) => (
            <tr className={styles.tr} key={item.timestamp}>
              <td className={styles.time}>
                {new Date(item.timestamp).toLocaleString()}
              </td>
              <td className={styles.temperature}>{item.temperature}°C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricalDataTable;
