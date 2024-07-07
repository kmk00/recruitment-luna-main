import calculateTemperatureColor from "../../utils/calculateTemperatureColor";
import styles from "./CurrentTemperature.module.css";

const CurrentTemperature = ({
  currentTemperature,
  targetTemperature,
  available,
}: {
  currentTemperature: number | undefined;
  targetTemperature: number;
  available: boolean;
}) => {
  const accent = calculateTemperatureColor(
    currentTemperature,
    targetTemperature
  );

  return (
    <div
      className={`${styles["module__container"]} ${styles["module__temperature"]}`}
    >
      <p className={styles["module__temperature-label"]}>Current</p>

      {!available ? (
        <p className={styles["module__temperature-status"]}> not available</p>
      ) : (
        <p
          className={`${styles["module__temperature-value--" + accent]} ${
            styles["module__temperature-value"]
          } `}
        >
          {currentTemperature ? `${currentTemperature} °C` : "--"}
        </p>
      )}
    </div>
  );
};

export default CurrentTemperature;
