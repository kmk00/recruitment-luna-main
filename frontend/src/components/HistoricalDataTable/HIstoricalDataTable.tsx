import { HistoricalData } from "../../types.global";
import styles from "./HistoricalDataTable.module.css";

const HistoricalDataTable = ({ data, start, stop, mode }: HistoricalData) => {
  return (
    <div className={`${styles["historical-data"]} glass`}>
      <h2>Historical Data Table - {mode}</h2>
      <p>
        {new Date(start).toLocaleString()} - {new Date(stop).toLocaleString()}
      </p>
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
