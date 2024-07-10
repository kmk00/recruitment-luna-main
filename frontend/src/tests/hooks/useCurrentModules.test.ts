import { renderHook, waitFor } from "@testing-library/react";
import useCurrentModules from "../../hooks/useCurrentModules";

// Unchanged modules from the server API:
const modules = [
  {
    id: "0a0f77eb1-50a0-4d98-8116-064fc5a84693",
    name: "Hydroponic module 1",
    available: true,
    targetTemperature: 10,
  },
  {
    id: "4d0aa62c-b1a9-489d-b4a2-fc16b878ba47",
    name: "Hydroponic module 2",
    available: false,
    targetTemperature: 15.5,
  },
  {
    id: "d4928094-8ef8-48be-823a-4cddef643249",
    name: "Hydroponic module 3",
    available: true,
    targetTemperature: 20,
  },
];

describe("useCurrentModules", () => {
  test("It should fetch the current modules", async () => {
    const { result } = renderHook(() => useCurrentModules());

    await waitFor(() => expect(result.current.modules).toHaveLength(3));
  });

  test("It should return the current modules", async () => {
    const { result } = renderHook(() => useCurrentModules());

    await waitFor(() => expect(result.current.modules).toEqual(modules));
  });
});
