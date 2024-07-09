import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import HistoricalData from "./HistoricalData";

describe("HistoricalData", () => {
  test("It should display the error message when there is no input", async () => {
    const { getByText } = render(
      <HistoricalData moduleId="0a0f77eb1-50a0-4d98-8116-064fc5a84693" />
    );

    fireEvent.click(getByText(/Search/i));

    expect(
      await screen.findByText("Start date is required")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Stop date is required")
    ).toBeInTheDocument();

    expect(await screen.findByText("Mode is required")).toBeInTheDocument();
  });
});
