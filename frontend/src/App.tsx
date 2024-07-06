import styles from "./styles/App.module.css";
import HydroponicModule from "./components/HydroponicModule/HydroponicModule";
import { useEffect, useState } from "react";
import { CurrentTemperatureData, Module } from "./types.global";
import { io } from "socket.io-client";

function App() {
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    const fetchModules = async () => {
      const response = await fetch("http://localhost:3001/modules");
      const modules = await response.json();
      setModules(modules);
    };

    fetchModules();
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("moduleUpdate", (updatedModules: CurrentTemperatureData[]) => {
      const updatedData = modules.map((module) => {
        const updatedModule = updatedModules.find(
          (temperatureInfo: CurrentTemperatureData) =>
            module.id === temperatureInfo.id
        );
        return updatedModule
          ? { ...module, currentTemperature: updatedModule.temperature }
          : module;
      });
      setModules(updatedData);
    });

    socket.on("error", (error) => {
      console.error(error);
    });

    return () => {
      socket.disconnect();
    };
  }, [modules]);

  return (
    <div className={styles["app"]}>
      <h1>Hydroponic modules</h1>
      <div className={styles["modules-container"]}>
        {modules.map((module) => (
          <HydroponicModule
            id={module.id}
            key={module.id}
            name={module.name}
            currentTemperature={module.currentTemperature}
            targetTemperature={module.targetTemperature}
            available={module.available}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
