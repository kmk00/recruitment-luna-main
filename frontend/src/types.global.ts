export interface Module {
  id: string;
  name: string;
  available: boolean;
  targetTemperature: number;
  currentTemperature: number;
}

export interface DetailedModule extends Module {
  description: string;
}
