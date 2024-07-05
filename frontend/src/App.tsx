import "./styles/App.css";
import HydroponicModule from "./components/HydroponicModule";
import { useEffect, useState } from "react";
import { Module } from "./types.global";

function App() {
  const [data, setData] = useState<Module[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/modules");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Hydroponic modules</h1>
      <div className="modules-container">
        {data.map((module) => (
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
    </>
  );
}

export default App;
