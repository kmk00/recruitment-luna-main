import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("It should render the app with a title", () => {
    render(<App />);

    expect(screen.getByText(/Hydroponic modules/i)).toBeDefined();
  });
});
