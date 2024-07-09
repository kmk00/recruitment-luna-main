export interface Module {
  id: string;
  name: string;
  available: boolean;
  targetTemperature: number;
  currentTemperature?: number;
}

export interface DetailedModule extends Module {
  description: string;
}

export interface CurrentTemperatureData {
  id: string;
  temperature: number;
}

export interface HistoricalTemperatureData {
  timestamp: string;
  temperature: number;
}

export interface HistoricalData {
  mode: string;
  data: HistoricalTemperatureData[];
  start: string;
  stop: string;
}
