import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import HydroponicModule from "./HydroponicModule";
import { MemoryRouter } from "react-router-dom";

describe("HydroponicModule", () => {
  test("It should render the component with a name correctly", () => {
    render(
      <MemoryRouter>
        <HydroponicModule
          name="Module 1"
          id="1"
          targetTemperature={20}
          available={true}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Module 1/i)).toBeDefined();
  });

  test("It should give a correct link to the module based on the id", () => {
    render(
      <MemoryRouter>
        <HydroponicModule
          name="Module 1"
          id="3f21t-4f4f-6f6f-8f8f-9f9f9f9f9f9f"
          targetTemperature={20}
          available={true}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/3f21t-4f4f-6f6f-8f8f-9f9f9f9f9f9f"
    );
  });
});
