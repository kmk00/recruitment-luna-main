import { Link } from "react-router-dom";
import styles from "./HydroponicModule.module.css";
import { Module } from "../../types.global.ts";
import CurrentTemperature from "../CurrentTemperature/CurrentTemperature.tsx";

const HydroponicModule = ({
  id,
  name,
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
      <div className={styles["module__temperatures-container"]}>
        <div>
          <CurrentTemperature
            moduleId={id}
            targetTemperature={targetTemperature}
            available={available}
          />
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
