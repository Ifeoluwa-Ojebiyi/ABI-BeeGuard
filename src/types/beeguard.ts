export type RiskLevel = 'NOMINAL' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type PredictionType =
  | 'SWARMING'
  | 'HONEY_READINESS'
  | 'COLONY_STRESS'
  | 'FIRE_RISK'
  | 'CHEMICAL_EXPOSURE'
  | 'ENVIRONMENTAL_CHANGE'
  | 'THEFT_TAMPERING'
  | 'HEALTHY_FORAGING';

export type SectorId = 'SECTOR_A' | 'SECTOR_B' | 'SECTOR_C' | 'SECTOR_D';

export interface HiveTelemetry {
  id: string;
  name: string;
  sector: SectorId;
  sectorName: string;
  lat: number;
  lng: number;
  temperature: number; // Celsius (brood nest)
  humidity: number; // Relative %
  acousticPeakHz: number; // Dominant frequency Hz
  weightKg: number; // Total colony weight kg
  weightDelta24h: number; // 24h change kg
  foragingActivity: number; // Bee flight passes per min
  smokePpm: number; // MQ-2 smoke particulate ppm
  vocIndex: number; // BME688 VOC index (0-500)
  vibrationLevel: number; // Accelerometer tilt/vibration m/s²
  solarVoltage: number; // Volts
  batteryPercent: number; // %
  mpptEfficiency: number; // %
  ambientTemp: number; // External Celsius
  weatherCondition: string;
  windSpeed: number; // km/h
  rssi: number; // LoRa RSSI dBm
  snr: number; // LoRa SNR dB
  lastUplinkSecondsAgo: number;
  status: RiskLevel;
  activeCondition: PredictionType;
}

export interface AIDiagnosisResult {
  conditionTitle: string;
  riskLevel: RiskLevel;
  predictionType: PredictionType;
  confidenceScore: number;
  departureOrActionWindow: string;
  acousticDiagnosis: string;
  environmentalContext: string;
  beekeeperProtocol: string[];
  smsAlertPayload: string;
}

export interface BOMItem {
  id: string;
  component: string;
  partNumber: string;
  function: string;
  unitCostUSD: number;
  category: 'COMPUTE' | 'RF' | 'SENSORS' | 'POWER' | 'ENCLOSURE';
  keySpec: string;
  supplier: string;
}

export interface PriorArtEntry {
  company: string;
  origin: string;
  hardwareCost: string;
  connectivity: string;
  acousticAnalysis: string;
  environmentalBioMesh: string;
  ruralYouthModel: string;
  limitations: string;
}
