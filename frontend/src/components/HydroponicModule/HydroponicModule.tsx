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
      <div className={styles["module__temperatures"]}>
        <div className={styles["module__temperature"]}>
          <p className={styles["module__temperature-label"]}>Current</p>
          <p className={styles["module__temperature-value"]}>
            {currentTemperature ? currentTemperature + "°C" : "--"}
          </p>
        </div>
        <div className={styles["module__temperature"]}>
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
