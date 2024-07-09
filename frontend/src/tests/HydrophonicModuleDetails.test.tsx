import { render } from "@testing-library/react";
import HydrophonicModuleDetails from "../HydrophonicModuleDetails";

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("HydrophonicModuleDetails", () => {
  test("It should not display the edit modal when the opened state is false", () => {
    vi.mock("react-router-dom", () => ({
      useParams: () => ({ id: undefined }),
    }));
    const { container } = render(<HydrophonicModuleDetails />);

    expect(container).toBeEmptyDOMElement();
  });
});
