import { useEffect, useState } from "react";
import { CurrentTemperatureData, DetailedModule } from "../../types.global";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./HydrophonicModuleDetails.module.css";
import EditModal from "../EditModal/EditModal";
import { io } from "socket.io-client";
import calculateTemperatureColor from "../../utils/calculateTemperatureColor";

const HydrophonicModuleDetails = () => {
  const [data, setData] = useState<DetailedModule>();
  const id = useParams<{ id: string }>().id;
  const navigate = useNavigate();

  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/modules/${id}`);

        if (!response.ok) {
          navigate("/error");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("error");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("moduleUpdate", (moduleUpdate: CurrentTemperatureData[]) => {
      const moduleToUpdate = moduleUpdate.find(
        (module: CurrentTemperatureData) => module.id === id
      );

      if (!moduleToUpdate) {
        return;
      }

      setData((prev) => {
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
  }, [data]);

  const accent = calculateTemperatureColor(
    data?.currentTemperature,
    data?.targetTemperature
  );

  return (
    <>
      {data ? (
        <div className="">
          <div className={styles["module__heading"]}>
            <h1>{data.name}</h1>
            <button
              disabled={!data.available}
              className={`${styles["btn"]} ${
                !data.available && styles["btn--disabled"]
              }`}
              onClick={() => setOpened(!opened)}
            >
              Edit
            </button>
          </div>
          {!data.available && <p>Module is not available</p>}
          <div className={styles["content"]}>
            <p
              className={`${styles["module__temperature"]} ${
                styles["module__temperature-value--" + accent]
              }`}
            >
              Current temperature: {data.currentTemperature}°C
            </p>
            <p>Target temperature: {data.targetTemperature}°C</p>
            <p>{data.description}</p>
          </div>
          <Link to="/">
            <button className={styles["btn"]}>Go back</button>
          </Link>
          {opened && (
            <EditModal moduleId={data.id} closeModal={() => setOpened(false)} />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default HydrophonicModuleDetails;
