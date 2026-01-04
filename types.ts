
export interface SensorData {
  soilMoisture: number;
  humidity: number;
  co2: number;
  airTemp: number;
  soilTemp: number;
  timestamp: string;
}

export interface PlantLog {
  id: string;
  date: string;
  status: string;
  actionTaken: string;
  aiAnalysis: string;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  ABOUT = 'ABOUT',
  EXPERIMENTS = 'EXPERIMENTS',
  BUILD_GUIDE = 'BUILD_GUIDE'
}
