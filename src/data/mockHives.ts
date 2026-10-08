import { HiveTelemetry, SectorId } from '../types/beeguard';

const sectors: { id: SectorId; name: string; baseLat: number; baseLng: number }[] = [
  { id: 'SECTOR_A', name: 'Zone A - Agro-Orchard Perimeter', baseLat: 8.482, baseLng: 4.541 },
  { id: 'SECTOR_B', name: 'Zone B - Pine Forest Wildfire Frontier', baseLat: 8.491, baseLng: 4.552 },
  { id: 'SECTOR_C', name: 'Zone C - Riparian Waterway Buffer', baseLat: 8.475, baseLng: 4.563 },
  { id: 'SECTOR_D', name: 'Zone D - Youth Enterprise Solar Apiary', baseLat: 8.488, baseLng: 4.532 },
];

export function generate100Hives(): HiveTelemetry[] {
  const hives: HiveTelemetry[] = [];

  for (let i = 1; i <= 100; i++) {
    const sectorIndex = Math.floor((i - 1) / 25);
    const sector = sectors[sectorIndex];
    const padId = i.toString().padStart(3, '0');
    const hiveId = `HIVE-${padId}`;

    // Micro spatial offsets
    const subCol = (i - 1) % 5;
    const subRow = Math.floor(((i - 1) % 25) / 5);
    const lat = sector.baseLat + (subRow - 2) * 0.0018 + (Math.sin(i) * 0.0004);
    const lng = sector.baseLng + (subCol - 2) * 0.0022 + (Math.cos(i) * 0.0004);

    // Default nominal baseline
    let temp = +(34.8 + (Math.sin(i * 1.3) * 0.4)).toFixed(1);
    let humidity = Math.round(58 + Math.cos(i * 2.1) * 4);
    let acousticHz = Math.round(225 + Math.sin(i) * 15);
    let weightKg = +(44.2 + (i % 12) * 0.8 + Math.sin(i) * 1.5).toFixed(1);
    let weightDelta24h = +(0.35 + Math.cos(i * 3) * 0.2).toFixed(2);
    let foragingActivity = Math.round(45 + Math.sin(i) * 12);
    let smokePpm = Math.round(8 + (i % 6));
    let vocIndex = Math.round(22 + (i % 15));
    let vibration = +(0.08 + (i % 5) * 0.02).toFixed(2);
    let solarVolt = +(4.1 + Math.sin(i) * 0.15).toFixed(2);
    let battery = Math.round(92 + (i % 8));
    let status: 'NOMINAL' | 'MODERATE' | 'HIGH' | 'CRITICAL' = 'NOMINAL';
    let condition: any = 'HEALTHY_FORAGING';

    // Highlight realistic active anomalies in specific hives for deep simulation
    if (i === 4) {
      // Swarming preparation
      temp = 36.3;
      humidity = 64;
      acousticHz = 492; // Pre-swarm piping & flight vibration
      weightKg = 48.6;
      weightDelta24h = -0.15;
      foragingActivity = 78;
      status = 'HIGH';
      condition = 'SWARMING';
    } else if (i === 12) {
      // Agrochemical / pesticide drift
      temp = 34.2;
      humidity = 67;
      acousticHz = 188;
      foragingActivity = 4;
      vocIndex = 186; // High chemical VOC signature
      vibration = 1.45; // Agitation tremors
      status = 'CRITICAL';
      condition = 'CHEMICAL_EXPOSURE';
    } else if (i === 38) {
      // Forest fire smoke proximity
      smokePpm = 168; // Dense smoke detection
      vocIndex = 120;
      temp = 35.9;
      acousticHz = 210;
      status = 'CRITICAL';
      condition = 'FIRE_RISK';
    } else if (i === 79) {
      // Honey readiness
      weightKg = 62.4;
      weightDelta24h = 2.85; // Massive nectar surplus
      humidity = 51; // Low moisture = ripe capped honey
      acousticHz = 230; // Steady fanning sound
      status = 'NOMINAL';
      condition = 'HONEY_READINESS';
    } else if (i === 18) {
      // Nocturnal hive tampering/theft attempt
      vibration = 3.8; // High shock
      acousticHz = 310;
      status = 'HIGH';
      condition = 'THEFT_TAMPERING';
    } else if (i === 63) {
      // Queen stress / drone laying or queen loss
      temp = 33.1; // Chilled brood
      acousticHz = 162; // Queenless mournful roar
      foragingActivity = 14;
      status = 'MODERATE';
      condition = 'COLONY_STRESS';
    }

    hives.push({
      id: hiveId,
      name: `Bio-Node #${padId}`,
      sector: sector.id,
      sectorName: sector.name,
      lat: +lat.toFixed(6),
      lng: +lng.toFixed(6),
      temperature: temp,
      humidity,
      acousticPeakHz: acousticHz,
      weightKg,
      weightDelta24h,
      foragingActivity,
      smokePpm,
      vocIndex,
      vibrationLevel: vibration,
      solarVoltage: solarVolt,
      batteryPercent: battery,
      mpptEfficiency: 94 + (i % 5),
      ambientTemp: 27.5,
      weatherCondition: 'Sunny / Mild Thermal',
      windSpeed: 8.2,
      rssi: -72 - (i % 25),
      snr: 9.4 - (i % 4) * 0.6,
      lastUplinkSecondsAgo: (i * 7) % 180,
      status,
      activeCondition: condition,
    });
  }

  return hives;
}

export const initialHives = generate100Hives();
