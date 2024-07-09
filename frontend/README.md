# Project Name

Recrutiment task - Aquaponic Iot

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Testing](#testing)

## Installation

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Open your browser and go to `http://localhost:5173`

## Usage

1. List of Modules

- The main page displays a list of all available modules with their parameters.
- Parameters shown include:
- - `name`: The name of the module.
- - `available`: The availability status of the module.
- - `targetTemperature`: The target temperature for the module.
- - `currentTemperature`: The current water temperature measured by the module.

2. Module Details

- Clicking on a module from the list navigates to a detailed view of the selected module.
- The detailed view shows:
- - `name`: The name of the module.
- - `description`: A detailed description of the module.
- - `available`: The availability status of the module.
- - `targetTemperature`: The target temperature for the module.
- - `currentTemperature`: The current water temperature measured by the module.
- An edit button allows for modifying the module parameters if the module is available.

3. Edit Module

- A modal/dialog is provided for editing the module parameters:
- - `name`: The name of the module.
- - `description`: A description of the module.
- - `targetTemperature`: The target temperature (0-40°C).
- Fields are validated before submission.

4. Real-time Temperature Updates

- The current water temperature is updated in real-time using WebSocket.
- Temperature values within ±0.5°C of the target temperature are displayed in green; otherwise, in red.

5. Historical Temperature Data

- Historical temperature data can be viewed in a table or chart format.
- Data can be filtered by a date range and aggregation mode (hourly or daily).

## Technologies And Libraries Used

- React
- TypeScript
- CSS Modules
- Socket.io-client
- Recharts
- React-hook-form
- React-router-dom
- Vitest
- React-testing-library

## Project Structure

Outline the structure of your project and explain the purpose of key files and directories.

```plaintext
src/
│   App.tsx
│   HydrophonicModuleDetails.tsx
│   main.tsx
│   types.global.ts
│   vite-env.d.ts
│
├───assets
│       react.svg
│
├───components
│   │   Error.tsx
│   │
│   ├───CurrentModuleData
│   │       CurrentModuleData.module.css
│   │       CurrentModuleData.test.tsx
│   │       CurrentModuleData.tsx
│   │
│   ├───CurrentTemperature
│   │       CurrentTemperature.module.css
│   │       CurrentTemperature.test.tsx
│   │       CurrentTemperature.tsx
│   │
│   ├───EditModal
│   │       EditModal.module.css
│   │       EditModal.test.tsx
│   │       EditModal.tsx
│   │
│   ├───HistoricalData
│   │       HistoricalData.module.css
│   │       HistoricalData.test.tsx
│   │       HistoricalData.tsx
│   │
│   ├───HistoricalDataCharts
│   │       HistoricalDataCharts.module.css
│   │       HistoricalDataCharts.tsx
│   │
│   ├───HistoricalDataTable
│   │       HistoricalDataTable.module.css
│   │       HistoricalDataTable.test.tsx
│   │       HistoricalDataTable.tsx
│   │
│   └───HydroponicModule
│           HydroponicModule.module.css
│           HydroponicModule.test.tsx
│           HydroponicModule.tsx
│
├───hooks
│       useCurrentModules.ts
│       useUpdateTemperature.ts
│
├───styles
│       App.module.css
│       Error.module.css
│       HydrophonicModuleDetails.module.css
│       index.css
│
├───tests
│   │   App.test.tsx
│   │   HydrophonicModuleDetails.test.tsx
│   │   setup.ts
│   │
│   ├───hooks
│   │       useCurrentModules.test.ts
│   │       useUpdateTemperature.test.ts
│   │
│   └───utils
│           calculateColor.test.ts
│
└───utils
        calculateTemperatureColor.ts
```

## Testing

To run tests, run the following command:

```sh
npm run test
```
