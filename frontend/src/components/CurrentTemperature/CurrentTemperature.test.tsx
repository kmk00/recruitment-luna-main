import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import CurrentTemperature from "./CurrentTemperature";

// Current temperature from the websocket
vi.mock("../../hooks/useUpdateTemperature", () => ({
  default: () => ({ currentTemperature: 21 }),
}));

describe("CurrentTemperature", () => {
  test("It should have the text 'Current'", () => {
    render(
      <CurrentTemperature
        moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693"
        targetTemperature={10}
        available={true}
      />
    );

    expect(screen.getByText(/Current/i)).toBeDefined();
  });

  test("It should display that the current temperature is not available when available is false", () => {
    render(
      <CurrentTemperature
        moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693"
        targetTemperature={10}
        available={false}
      />
    );

    expect(screen.getByText(/not available/i)).toBeDefined();
  });

  test("It should display current temperature from the websocket", () => {
    render(
      <CurrentTemperature
        moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693"
        targetTemperature={21}
        available={true}
      />
    );

    expect(screen.getByText(/21/i)).toBeInTheDocument();
  });

  test("It should have 'module__temperature-value--positive' class when the current temperature is within 0.5 degrees from the target", () => {
    render(
      <CurrentTemperature
        moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693"
        targetTemperature={21.5}
        available={true}
      />
    );

    expect(screen.getByText(/21/i)).toHaveClass(
      /module__temperature-value--positive/
    );
  });

  test("It should have 'module__temperature-value--negative' class when the current temperature is more than 0.5 degrees from the target", () => {
    render(
      <CurrentTemperature
        moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693"
        targetTemperature={10}
        available={true}
      />
    );

    expect(screen.getByText(/21/i)).toHaveClass(
      /module__temperature-value--negative/
    );
  });
});
