import { renderHook, waitFor } from "@testing-library/react";
import useUpdateTemperature from "../../hooks/useUpdateTemperature";
import { CurrentTemperatureData } from "../../types.global";

describe("useUpdateTemperature", () => {
  beforeEach(() => {
    vi.mock("socket.io-client", () => {
      return {
        io: () => ({
          on: (
            event: string,
            callback: (data: CurrentTemperatureData[]) => void
          ) => {
            if (event === "moduleUpdate") {
              callback([
                {
                  id: "0a0f77eb1-50a0-4d98-8116-064fc5a84693",
                  temperature: 25,
                },
              ]);
            }
          },
          disconnect: vi.fn(),
        }),
      };
    });
  });
});
