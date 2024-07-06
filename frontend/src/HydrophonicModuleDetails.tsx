import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./styles/HydrophonicModuleDetails.module.css";
import EditModal from "./components/EditModal/EditModal";
import HistoricalData from "./components/HistoricalData/HistoricalData";
import CurrentModuleData from "./components/CurrentModuleData/CurrentModuleData";

const HydrophonicModuleDetails = () => {
  const id = useParams<{ id: string }>().id;
  const [opened, setOpened] = useState<boolean>(false);
  const setOpenedCallback = () => setOpened(true);

  return (
    <>
      {id ? (
        <div className="">
          <CurrentModuleData action={setOpenedCallback} moduleId={id} />
          <HistoricalData moduleId={id} />
          <Link to="/">
            <button className={styles["btn"]}>Go back</button>
          </Link>
          {opened && (
            <EditModal moduleId={id} closeModal={() => setOpened(false)} />
          )}
        </div>
      ) : (
        <p>Module not found</p>
      )}
    </>
  );
};

export default HydrophonicModuleDetails;
