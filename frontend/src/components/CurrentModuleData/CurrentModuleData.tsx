import { useEffect, useState } from "react";
import calculateTemperatureColor from "../../utils/calculateTemperatureColor";
import { CurrentTemperatureData, DetailedModule } from "../../types.global";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CurrentModuleData.module.css";
import { io } from "socket.io-client";

type CurrentModuleDataProps = {
  moduleId: string;
  action: () => void;
};

const CurrentModuleData = ({ moduleId, action }: CurrentModuleDataProps) => {
  const [currentModule, setCurrentModule] = useState<DetailedModule>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(moduleId);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/modules/${moduleId}`
        );

        if (!response.ok) {
          navigate("/error");
        }

        const data = await response.json();
        setCurrentModule(data);
      } catch (error) {
        console.error("error");
      }
    };
    fetchData();
  }, [moduleId]);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("moduleUpdate", (moduleUpdate: CurrentTemperatureData[]) => {
      const moduleToUpdate = moduleUpdate.find(
        (module: CurrentTemperatureData) => module.id === moduleId
      );

      if (!moduleToUpdate) {
        return;
      }

      setCurrentModule((prev) => {
        if (prev) {
          return { ...prev, currentTemperature: moduleToUpdate.temperature };
        }
      });
    });

    socket.on("error", (error) => {
      console.error(error);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentModule]);

  const accent = calculateTemperatureColor(
    currentModule?.currentTemperature,
    currentModule?.targetTemperature
  );

  return (
    <>
      {currentModule ? (
        <div className={styles["module"]}>
          <div className={styles["module__header"]}>
            <h1 className={styles["module__name"]}>{currentModule.name}</h1>
            <div className={styles["module__buttons"]}>
              <button
                disabled={!currentModule.available}
                className={`${styles["btn"]} ${
                  !currentModule.available ? styles["btn--disabled"] : ""
                }`}
                onClick={action}
              >
                Edit
              </button>
              <Link to="/">
                <button className={styles["btn"]}>Go back</button>
              </Link>
            </div>
          </div>

          <div className={styles["module__temperatures-container"]}>
            <div
              className={`${styles["module__container"]} ${styles["module__temperature"]}`}
            >
              <p className={styles["module__temperature-label"]}>Current</p>
              <span
                className={`${styles["module__temperature-value--" + accent]}`}
              >
                {currentModule.currentTemperature}°C
              </span>
            </div>
            <div
              className={`${styles["module__container"]} ${styles["module__temperature"]}`}
            >
              <p className={styles["module__temperature-label"]}>Target</p>
              <span>{currentModule.targetTemperature}°C</span>
            </div>
          </div>
          <div className={styles["module__container"]}>
            <p className={styles["module__description"]}>
              {currentModule.description}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CurrentModuleData;
