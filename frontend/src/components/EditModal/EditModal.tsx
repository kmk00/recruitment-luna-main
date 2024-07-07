import { useForm } from "react-hook-form";
import styles from "./EditModal.module.css";
import { useEffect } from "react";

const EditModal = ({
  closeModal,
  moduleId,
}: {
  closeModal: () => void;
  moduleId: string;
}) => {
  type Inputs = {
    name: string;
    description: string;
    targetTemperature: number;
  };

  useEffect(() => {
    // Get module data for editing
    const fetchModule = async () => {
      const response = await fetch(`http://localhost:3001/modules/${moduleId}`);
      const module = await response.json();
      setValue("name", module.name);
      setValue("description", module.description);
      setValue("targetTemperature", module.targetTemperature);
    };

    fetchModule();
  }, [moduleId]);

  const updateModule = async (data: Inputs) => {
    // Update module data
    const response = await fetch(`http://localhost:3001/modules/${moduleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update module");
    }
    closeModal();
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    updateModule(data);
  };

  return (
    <div className={styles["edit-modal"]}>
      <div className={styles["edit-modal__content"]}>
        <h2 className={styles["edit-modal__title"]}>Edit module</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["edit-modal__form"]}
        >
          <label htmlFor="name">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
          />
          {errors.name && (
            <p className={styles["edit-modal__error"]}>Name is required</p>
          )}
          <label htmlFor="description">Description</label>
          <input
            {...register("description", { required: true })}
            type="text"
            id="description"
          />
          {errors.description && (
            <p className={styles["edit-modal__error"]}>
              Description is required
            </p>
          )}
          <label htmlFor="targetTemperature">Target temperature</label>
          <input
            {...register("targetTemperature", {
              required: true,
              min: 0,
              max: 40,
            })}
            type="text"
            id="targetTemperature"
          />
          {errors.targetTemperature && (
            <p className={styles["edit-modal__error"]}>
              Value between 0 and 40 is required
            </p>
          )}
          <input value={"Save"} type="submit" />
        </form>
        <button onClick={closeModal} className={styles["edit-modal__close"]}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditModal;
