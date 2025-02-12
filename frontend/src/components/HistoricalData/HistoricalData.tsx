import { useState } from "react";
import styles from "./HistoricalData.module.css";
import { HistoricalTemperatureData } from "../../types.global";
import { useForm } from "react-hook-form";
import HistoricalDataTable from "../HistoricalDataTable/HIstoricalDataTable";
import HistoricalDataCharts from "../HistoricalDataCharts/HistoricalDataCharts";

enum Mode {
  HOURLY = "hourly",
  DAILY = "daily",
}

type Inputs = {
  start: string;
  stop: string;
  mode: Mode;
};

type HistoricalDataProps = {
  moduleId: string;
};

const HistoricalData = ({ moduleId }: HistoricalDataProps) => {
  const [historicalData, setHistoricalData] =
    useState<HistoricalTemperatureData[]>();

  const [formData, setFormData] = useState<Inputs | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const response = await fetch(
      `http://localhost:3001/modules/${moduleId}/history?start=${data.start}&stop=${data.stop}&mode=${data.mode}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch historical data");
    }
    const responseData = await response.json();
    setFormData(data);
    setHistoricalData(responseData);
  };

  return (
    <div className={styles["historical-data"]}>
      <h2>Historical Data</h2>

      <form
        className={styles["historical-data__form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="start">Start date</label>
          <input
            {...register("start", { required: "Start date is required" })}
            type="datetime-local"
            id="start"
            step={".1"}
            name="start"
          />
          {errors.start && <p>{errors.start.message}</p>}
        </div>
        <div>
          <label htmlFor="stop">Stop date</label>
          <input
            {...register("stop", { required: "Stop date is required" })}
            type="datetime-local"
            step={".1"}
            id="stop"
            name="stop"
          />
          {errors.stop && <p>{errors.stop.message}</p>}
        </div>
        <div>
          <label htmlFor="hourly">Hourly</label>
          <input
            {...register("mode", { required: "Mode is required" })}
            type="radio"
            id="hourly"
            name="mode"
            value="hourly"
          />
        </div>
        <div>
          <label htmlFor="daily">Daily</label>
          <input
            {...register("mode")}
            type="radio"
            id="daily"
            name="mode"
            value="daily"
          />
        </div>
        {errors.mode && <p>{errors.mode.message}</p>}
        <button
          className={`${styles["historical-data__submit"]}`}
          type="submit"
        >
          Search Data
        </button>
      </form>

      {historicalData && formData && (
        <div className={styles["historical-data__charts"]}>
          <HistoricalDataCharts
            data={historicalData}
            mode={formData.mode}
            start={formData.start}
            stop={formData.stop}
          />
          <HistoricalDataTable
            data={historicalData}
            mode={formData.mode}
            start={formData.start}
            stop={formData.stop}
          />
        </div>
      )}
    </div>
  );
};

export default HistoricalData;
