import { useEffect, useState } from "react";
import { DetailedModule } from "../types.global";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/HydrophonicModuleDetails.css";

const HydrophonicModuleDetails = () => {
  const [data, setData] = useState<DetailedModule>();
  const id = useParams<{ id: string }>().id;
  const navigate = useNavigate();

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
        <div>
          <h1>{data?.name}</h1>
          <p>{data?.description}</p>
          <Link className="" to="/">
            <button className="btn">Go back</button>
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default HydrophonicModuleDetails;
