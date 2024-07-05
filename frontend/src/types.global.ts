export interface Module {
  id: string;
  name: string;
  available: boolean;
  targetTemperature: number;
  currentTemperature: number;
}

interface DetailedModule extends Module {
  description: string;
}
