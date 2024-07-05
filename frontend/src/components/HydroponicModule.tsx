import { Link } from "react-router-dom";
import "../styles/HydroponicModule.css";
import { Module } from "../types.global.ts";

const HydroponicModule = ({
  id,
  name,
  currentTemperature,
  targetTemperature,
  available,
}: Module) => {
  return (
    <Link className="module" to={`/${id}`}>
      <div className="module__header">
        <h2 className="module__title">{name}</h2>
        <p
          className={`module__status ${
            !available && "module__status--not-available"
          }`}
        >
          {available ? "available" : "not available"}
        </p>
      </div>
      <div className="module__temperature-container">
        <div className="module__temperature">
          <p className="module__temperature-label">Current</p>
          <p className="module__temperature-value">3°C</p>
        </div>
        <div className="module__temperature">
          <p className="module__temperature-label">Target</p>
          <p className="module__temperature-value">{targetTemperature}°C</p>
        </div>
      </div>
    </Link>
  );
};

export default HydroponicModule;
