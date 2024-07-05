import "./styles/App.css";
import HydroponicModule from "./components/HydroponicModule";

function App() {
  return (
    <>
      <h1>Hydroponic modules</h1>
      <div className="modules-container">
        <HydroponicModule />
        <HydroponicModule />
        <HydroponicModule />
        <HydroponicModule />
        <HydroponicModule />
        <HydroponicModule />
        <HydroponicModule />
      </div>
    </>
  );
}

export default App;
