import { useEffect, useState } from "react";

import { io } from "socket.io-client";
import { CurrentTemperatureData } from "../types.global";

const useUpdateTemperature = (moduleId: string) => {
  const [currentTemperature, setCurrentTemperature] = useState<
    number | undefined
  >();

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      transports: ["websocket"],
    });

    socket.on("moduleUpdate", (moduleUpdate: CurrentTemperatureData[]) => {
      const temperature =
        moduleUpdate.find(
          (module: CurrentTemperatureData) => module.id === moduleId
        )?.temperature || undefined;

      setCurrentTemperature(temperature);
    });

    socket.on("error", (error) => {
      console.error(error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    currentTemperature,
  };
};

export default useUpdateTemperature;
