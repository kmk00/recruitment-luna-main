import styles from "./styles/App.module.css";
import HydroponicModule from "./components/HydroponicModule/HydroponicModule";
import useCurrentModules from "./hooks/useCurrentModules";
import { Module } from "./types.global";

function App() {
  const { modules } = useCurrentModules();

  return (
    <div className={styles["app"]}>
      <h1>Hydroponic modules</h1>
      <div className={styles["modules-container"]}>
        {modules.map((module: Module) => (
          <HydroponicModule
            id={module.id}
            key={module.id}
            name={module.name}
            targetTemperature={module.targetTemperature}
            available={module.available}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
