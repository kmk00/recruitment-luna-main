import "../styles/HydroponicModule.css";
import { Module } from "../types.global.ts";

const HydroponicModule = ({
  name,
  currentTemperature,
  targetTemperature,
  available,
}: Module) => {
  return (
    <div className="module">
      <h2 className="module__title">{name}</h2>
      <p className="module__status">
        {available ? "Available" : "Not available"}
      </p>
      <div className="module__temperature-container">
        <div className="module__temperature">
          <p className="module__temperature-label">Current</p>
          <p className="module__temperature-value">{currentTemperature}°C</p>
        </div>
        <div className="module__temperature">
          <p className="module__temperature-label">Target</p>
          <p className="module__temperature-value">{targetTemperature}°C</p>
        </div>
      </div>
    </div>
  );
};

export default HydroponicModule;
