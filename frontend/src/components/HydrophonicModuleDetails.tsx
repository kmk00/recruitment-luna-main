import { useEffect, useState } from "react";
import { DetailedModule } from "../types.global";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/HydrophonicModuleDetails.css";
import EditModal from "./EditModal";

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

  return (
    <>
      {data ? (
        <div className="mo">
          <div className="module__heading">
            <h1>{data.name}</h1>
            <button
              disabled={!data.available}
              className={`btn ${!data.available && "btn--disabled"}`}
              onClick={() => setOpened(!opened)}
            >
              Edit
            </button>
          </div>
          {!data.available && <p>Module is not available</p>}
          <div className="content">
            <p>Current temperature: {data.currentTemperature}°C</p>
            <p>Target temperature: {data.targetTemperature}°C</p>
            <p>{data.description}</p>
          </div>
          <Link to="/">
            <button className="btn">Go back</button>
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
