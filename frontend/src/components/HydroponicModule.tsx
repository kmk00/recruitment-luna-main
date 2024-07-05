import "../styles/HydroponicModule.css";

const HydroponicModule = () => {
  return (
    <div className="module">
      <h2 className="module__title">Hydroponic module 3</h2>
      <p className="module__status">available</p>
      <div className="module__temperature-container">
        <div className="module__temperature">
          <p className="module__temperature-label">Current</p>
          <p className="module__temperature-value">2.4°C</p>
        </div>
        <div className="module__temperature">
          <p className="module__temperature-label">Target</p>
          <p className="module__temperature-value">10.0°C</p>
        </div>
      </div>
    </div>
  );
};

export default HydroponicModule;
