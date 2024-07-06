import { useState } from "react";
import styles from "./HistoricalData.module.css";
import { HistoricalTemperatureData } from "../../types.global";
import { useForm } from "react-hook-form";
import HIstoricalDataTable from "../HistoricalDataTable/HIstoricalDataTable";

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
    setHistoricalData(responseData);
  };

  return (
    <div className={styles["historical-data"]}>
      <h2>Historical Data</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="start">Start date</label>
        <input
          {...register("start")}
          type="datetime-local"
          id="start"
          name="start"
        />
        {errors.start && <p>{errors.start.message}</p>}
        <label htmlFor="stop">Stop date</label>
        <input
          {...register("stop", { required: "Stop date is required" })}
          defaultValue={new Date().toISOString().slice(0, -8)}
          type="datetime-local"
          id="stop"
          name="stop"
        />
        {errors.stop && <p>{errors.stop.message}</p>}
        <label htmlFor="mode">Hourly</label>
        <input
          {...register("mode")}
          type="radio"
          id="hourly"
          name="mode"
          value="hourly"
        />
        <label htmlFor="hourly">Daily</label>
        <input
          {...register("mode")}
          type="radio"
          id="daily"
          name="mode"
          value="daily"
        />
        {errors.mode && <p>{errors.mode.message}</p>}
        <button type="submit">Find</button>
      </form>

      {historicalData && (
        <HIstoricalDataTable
          data={historicalData}
          mode={data.mode}
          start={data.start}
          stop={data.stop}
        />
      )}
    </div>
  );
};

export default HistoricalData;
