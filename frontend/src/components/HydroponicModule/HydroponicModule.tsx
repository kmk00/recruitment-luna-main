import { Link } from "react-router-dom";
import styles from "./HydroponicModule.module.css";
import { Module } from "../../types.global.ts";

const HydroponicModule = ({
  id,
  name,
  currentTemperature,
  targetTemperature,
  available,
}: Module) => {
  const calculateTemperatureColor = (temperature: number) => {
    if (
      targetTemperature - temperature > 0.5 ||
      temperature - targetTemperature > 0.5
    )
      return "negative";
    else return "positive";
  };

  return (
    <Link className={styles["module"]} to={`/${id}`}>
      <div className={styles["module__header"]}>
        <h2 className={styles["module__name"]}>{name}</h2>
        <p
          className={`${styles["module__status"]} ${
            !available && styles["module__status--not-available"]
          }`}
        >
          {available ? "available" : "not available"}
        </p>
      </div>
      <div className={styles["module__temperatures-container"]}>
        <div>
          <p className={styles["module__temperature-label"]}>Current</p>
          <p
            className={`${styles["module__temperature-value"]} ${
              available &&
              styles[
                `module__temperature-value--${calculateTemperatureColor(
                  currentTemperature
                )}`
              ]
            }`}
          >
            {currentTemperature ? currentTemperature + "°C" : "--"}
          </p>
        </div>
        <div>
          <p className={styles["module__temperature-label"]}>Target</p>
          <p className={styles["module__temperature-value"]}>
            {targetTemperature}°C
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HydroponicModule;
