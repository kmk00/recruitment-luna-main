import { useState } from "react";
import { useParams } from "react-router-dom";
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
        <div className={styles["module-details"]}>
          <CurrentModuleData action={setOpenedCallback} moduleId={id} />
          <HistoricalData moduleId={id} />
          {opened && (
            <EditModal moduleId={id} closeModal={() => setOpened(false)} />
          )}
        </div>
      ) : null}
    </>
  );
};

export default HydrophonicModuleDetails;
