import { describe, expect, test } from "vitest";
import calculateTemperatureColor from "../../utils/calculateTemperatureColor";

describe("Calculate color for the temperature", () => {
  test("Returns true if the current temperature is within 0.5 degrees from the target", () => {
    const temperature = 20;

    const currentTemperatures = [19.5, 20, 20.5, 19.8];

    currentTemperatures.forEach((currentTemperature) => {
      const color = calculateTemperatureColor(temperature, currentTemperature);
      expect(color).toBe(true);
    });
  });

  test("Returns false if the current temperature is not within 0.5 degrees from the target", () => {
    const temperature = 20;

    const currentTemperatures = [19.4, 21.6];

    currentTemperatures.forEach((currentTemperature) => {
      const color = calculateTemperatureColor(temperature, currentTemperature);
      expect(color).toBe(false);
    });
  });

  test("Returns undefined if the current temperature is undefined", () => {
    const temperature = 20;
    const color = calculateTemperatureColor(undefined, temperature);
    expect(color).toBe(undefined);
  });
});
