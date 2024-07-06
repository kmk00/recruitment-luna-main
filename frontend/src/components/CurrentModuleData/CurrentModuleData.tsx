import { useEffect, useState } from "react";
import calculateTemperatureColor from "../../utils/calculateTemperatureColor";
import { CurrentTemperatureData, DetailedModule } from "../../types.global";
import { useNavigate } from "react-router-dom";
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
        <>
          <div className={styles["module__heading"]}>
            <h1>{currentModule?.name}</h1>
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

          <div className={styles["content"]}>
            <p
              className={`${styles["module__temperature"]} ${
                styles["module__temperature-value--" + accent]
              }`}
            >
              Current temperature: {currentModule?.currentTemperature}°C
            </p>
            <p>Target temperature: {currentModule?.targetTemperature}°C</p>
            <p>{currentModule?.description}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CurrentModuleData;
