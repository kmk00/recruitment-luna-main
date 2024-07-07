import { useEffect, useState } from "react";

import { io } from "socket.io-client";
import { CurrentTemperatureData, Module } from "../types.global";

const useCurrentModules = () => {
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

  return {
    modules,
  };
};

export default useCurrentModules;
