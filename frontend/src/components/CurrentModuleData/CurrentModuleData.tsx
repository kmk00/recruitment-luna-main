import { useEffect, useState } from "react";
import { DetailedModule } from "../../types.global";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CurrentModuleData.module.css";
import CurrentTemperature from "../CurrentTemperature/CurrentTemperature";

type CurrentModuleDataProps = {
  moduleId: string;
  action: () => void;
};

const CurrentModuleData = ({ moduleId, action }: CurrentModuleDataProps) => {
  const [currentModule, setCurrentModule] = useState<DetailedModule>();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return (
    <>
      <div className={styles["module"]}>
        <div className={styles["module__header"]}>
          <p className={styles["module__name"]}>
            {(currentModule && currentModule.name) || "Loading..."}
          </p>
          <div className={styles["module__buttons"]}>
            <Link to="/">
              <button className={styles["btn"]}>Go back</button>
            </Link>
            <button
              disabled={!currentModule?.available}
              className={`${styles["btn"]} ${
                !currentModule?.available ? styles["btn--disabled"] : ""
              }`}
              onClick={action}
            >
              Edit
            </button>
          </div>
        </div>

        <div className={styles["module__temperatures-container"]}>
          {currentModule ? (
            <div
              className={`${styles["module__container"]} ${styles["module__temperature"]}`}
            >
              <CurrentTemperature
                moduleId={moduleId}
                available={currentModule.available}
                targetTemperature={currentModule.targetTemperature}
              />
            </div>
          ) : (
            <div className={`${styles["module__container"]}`}>
              <p className={styles["module__temperature-label"]}>Current</p>
              <p className={styles["module__temperature-value"]}>...</p>
            </div>
          )}
          <div className={`${styles["module__container"]}`}>
            <p className={styles["module__temperature-label"]}>Target</p>
            <p className={styles["module__temperature-value"]}>
              {currentModule?.targetTemperature}°C
            </p>
          </div>
        </div>
        <div className={styles["module__container"]}>
          <p className={styles["module__description"]}>
            {(currentModule && currentModule.description) || "..."}
          </p>
        </div>
      </div>
    </>
  );
};

export default CurrentModuleData;
