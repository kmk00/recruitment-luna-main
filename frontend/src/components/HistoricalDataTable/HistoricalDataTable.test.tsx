import { render, screen } from "@testing-library/react";
import HistoricalDataTable from "./HIstoricalDataTable";

const dataTest = [
  {
    timestamp: "2024-07-07T10:45:29.800Z",
    temperature: 9.8,
  },
  {
    timestamp: "2024-07-08T10:45:29.800Z",
    temperature: 10.7,
  },
  {
    timestamp: "2024-07-09T10:45:29.800Z",
    temperature: 9.8,
  },
  {
    timestamp: "2024-07-10T10:45:29.800Z",
    temperature: 10.7,
  },
  {
    timestamp: "2024-07-11T10:45:29.800Z",
    temperature: 9.1,
  },
];

describe("HistoricalDataTable", () => {
  test("It should render the component", () => {
    render(
      <HistoricalDataTable
        mode="daily"
        start="2024-07-07T10:45:29.800Z"
        stop="2024-07-11T10:45:29.800Z"
        data={dataTest}
      />
    );

    expect(HistoricalDataTable).toBeDefined();
  });

  test("It should display a table with two columns - date and temperature", () => {
    render(
      <HistoricalDataTable
        mode="daily"
        start="2024-07-07T10:45:29.800Z"
        stop="2024-07-11T10:45:29.800Z"
        data={dataTest}
      />
    );

    const table = document.querySelector("table");
    expect(table).toBeDefined();
    const tbody = table?.querySelector("tbody");
    expect(tbody).toBeDefined();
    const rows = tbody?.querySelectorAll("tr");
    expect(rows).toHaveLength(5);
  });

  test("It should display the correct date and temperature", () => {
    render(
      <HistoricalDataTable
        mode="daily"
        start="2024-07-07T10:45:29.800Z"
        stop="2024-07-11T10:45:29.800Z"
        data={dataTest}
      />
    );
  });

  test("It should display mode in the header correctly", () => {
    const { getByText } = render(
      <HistoricalDataTable
        data={dataTest}
        start="2023-01-01T00:00:00Z"
        stop="2023-01-02T00:00:00Z"
        mode="daily"
      />
    );
    expect(getByText("Historical Data Table - daily")).toBeInTheDocument();
  });

  test("It should format start and stop dates correctly", () => {
    const data = [
      { timestamp: "2023-01-01T00:00:00Z", temperature: 20 },
      { timestamp: "2023-01-02T00:00:00Z", temperature: 21 },
    ];
    const { getByText } = render(
      <HistoricalDataTable
        data={data}
        start="2023-01-01T00:00:00Z"
        stop="2023-01-02T00:00:00Z"
        mode="daily"
      />
    );
    const startDate = getByText(new Date(data[0].timestamp).toLocaleString());
    const endDate = getByText(new Date(data[1].timestamp).toLocaleString());
    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
  });

  test("should show temperatures with degree Celsius symbol", () => {
    const data = [
      { timestamp: "2023-01-01T00:00:00Z", temperature: 20 },
      { timestamp: "2023-01-02T00:00:00Z", temperature: 21 },
    ];
    const { getAllByText } = render(
      <HistoricalDataTable
        data={data}
        start="2023-01-01T00:00:00Z"
        stop="2023-01-02T00:00:00Z"
        mode="daily"
      />
    );
    const temperatureCells = getAllByText(/°C/);
    expect(temperatureCells).toHaveLength(data.length);
  });
});
