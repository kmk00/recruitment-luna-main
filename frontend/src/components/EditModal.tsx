import { useForm } from "react-hook-form";
import "../styles/EditModal.css";

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

  const updateModule = async (data: Inputs) => {
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
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    updateModule(data);
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal__content">
        <h2 className="edit-modal__title">Edit module</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="edit-modal__form">
          <label htmlFor="name">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            id="name"
          />
          {errors.name && <p className="edit-modal__error">Name is required</p>}
          <label htmlFor="description">Description</label>
          <input
            {...register("description", { required: true })}
            type="text"
            id="description"
          />
          {errors.description && (
            <p className="edit-modal__error">Name is required</p>
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
            <p className="edit-modal__error">
              Value between 0 and 40 is required
            </p>
          )}
          <input className="" value={"Save"} type="submit" />
        </form>
        <button onClick={closeModal} className="edit-modal__close">
          Close
        </button>
      </div>
    </div>
  );
};

export default EditModal;
