import useUpdateTemperature from "../../hooks/useUpdateTemperature";
import calculateTemperatureColor from "../../utils/calculateTemperatureColor";
import styles from "./CurrentTemperature.module.css";

const CurrentTemperature = ({
  moduleId,
  targetTemperature,
  available,
}: {
  moduleId: string;
  targetTemperature: number;
  available: boolean;
}) => {
  const { currentTemperature } = useUpdateTemperature(moduleId);

  const accent = calculateTemperatureColor(
    currentTemperature,
    targetTemperature
  );

  return (
    <>
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
    </>
  );
};

export default CurrentTemperature;
