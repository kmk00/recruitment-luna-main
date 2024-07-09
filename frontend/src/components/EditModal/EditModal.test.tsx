import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EditModal from "./EditModal";

// Molule with id: 0a0f77eb1-50a0-4d98-8116-064fc5a84693
// {
//   "id": "0a0f77eb1-50a0-4d98-8116-064fc5a84693",
//   "name": "Hydroponic module 1",
//   "available": true,
//   "targetTemperature": 10
// },

describe("EditModal", () => {
  test("It should render the edit modal with a form ", () => {
    const { container } = render(
      <EditModal
        moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693"
        closeModal={() => null}
      />
    );

    screen.debug(container);

    expect(container).toBeDefined();
    expect(container.querySelector("h2")).toHaveTextContent("Edit module");
    expect(screen.getByRole("button", { name: /save/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /close/i })).toBeDefined();
    expect(screen.getByLabelText("Name")).toBeDefined();
    expect(screen.getByLabelText("Description")).toBeDefined();
    expect(screen.getByLabelText("Target temperature")).toBeDefined();
  });

  test("It should call the closeModal function when the close button is clicked", () => {
    const closeModal = vi.fn();
    render(
      <EditModal
        moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693"
        closeModal={closeModal}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(closeModal).toHaveBeenCalled();
  });

  test("It should get and display previous values when rendered", () => {
    render(
      <EditModal
        moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693"
        closeModal={() => null}
      />
    );

    const nameInput = screen.getByLabelText("Name");
    const descriptionInput = screen.getByLabelText("Description");
    const targetTemperatureInput = screen.getByLabelText("Target temperature");

    waitFor(() => {
      expect(nameInput).toHaveValue("Module 1");
      expect(descriptionInput).toHaveValue("Module 1 description");
      expect(targetTemperatureInput).toHaveValue(20);
    });
  });

  test("It should say 'Value between 0 and 40 is required' when the temperature is not valid", () => {
    render(
      <EditModal
        moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693"
        closeModal={() => null}
      />
    );

    const targetTemperatureInput = screen.getByLabelText("Target temperature");
    fireEvent.change(targetTemperatureInput, { target: { value: -1 } });

    waitFor(() => {
      expect(
        screen.getByText(/Value between 0 and 40 is required/i)
      ).toBeDefined();
    });
  });

  test.todo("It should close the modal after the form is submitted", () => {});
});
