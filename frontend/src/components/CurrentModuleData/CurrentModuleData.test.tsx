import { render, screen, waitFor } from "@testing-library/react";
import CurrentModuleData from "./CurrentModuleData";
import { MemoryRouter } from "react-router-dom";

// Used modules:
// {
//   "id": "0a0f77eb1-50a0-4d98-8116-064fc5a84693",
//   "name": "Hydroponic module 1",
//   "available": true,
//   "targetTemperature": 10
// },
// {
//   "id": "4d0aa62c-b1a9-489d-b4a2-fc16b878ba47",
//   "name": "Hydroponic module 2",
//   "available": false,
//   "targetTemperature": 15.5
// },

describe("CurrentModuleData", () => {
  test("It should have the edit button disabled when the module is not available", async () => {
    const action = () => vi.fn();
    const refresh = false;

    render(
      <MemoryRouter>
        <CurrentModuleData
          refresh={refresh}
          moduleId="4d0aa62c-b1a9-489d-b4a2-fc16b878ba47"
          action={action}
        />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /edit/i })).not.toBeEnabled()
    );
  });

  test("It should have the edit button enabled when the module is available", async () => {
    const action = () => vi.fn();
    const refresh = false;

    render(
      <MemoryRouter>
        <CurrentModuleData
          refresh={refresh}
          moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693"
          action={action}
        />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /edit/i })).toBeEnabled()
    );
  });

  test("It should have go back button", () => {
    const action = () => vi.fn();
    const refresh = false;

    render(
      <MemoryRouter>
        <CurrentModuleData
          refresh={refresh}
          moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693"
          action={action}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /go back/i })).toBeDefined();
  });

  test("It should render the module details", async () => {
    const action = () => vi.fn();

    render(
      <MemoryRouter>
        <CurrentModuleData
          refresh={false}
          moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693"
          action={action}
        />
      </MemoryRouter>
    );

    // Unchanged modules from the server API:
    await waitFor(() =>
      expect(screen.getByText("Hydroponic module 1")).toBeDefined()
    );
    await waitFor(() => expect(screen.getByText("Target")).toBeDefined());
    await waitFor(() => expect(screen.getByText("10°C")).toBeDefined());
  });
});
