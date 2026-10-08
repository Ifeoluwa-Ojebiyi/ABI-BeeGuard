import { PriorArtEntry } from '../types/beeguard';

export const COMPETITOR_BENCHMARK: PriorArtEntry[] = [
  {
    company: 'ABI-BEEGUARD (Our Invention)',
    origin: 'Open Architecture / Africa & Global',
    hardwareCost: '$40.90 (Sub-$42 BOM)',
    connectivity: 'Autonomous LoRaWAN (15km) + Micro Solar MPPT',
    acousticAnalysis: 'On-chip 24-bit I2S MEMS FFT (100-1000Hz) with harmonic ratio classification',
    environmentalBioMesh: 'Dual biological + environmental transduction (pesticides, smoke, microclimate across 100-node farm grid)',
    ruralYouthModel: 'Open cooperative assembly kits, local technician training & data-credit enterprise',
    limitations: 'Active field deployment pilot in progress.',
  },
  {
    company: 'BeeHero',
    origin: 'United States / Israel',
    hardwareCost: '$30 - $50 / hive / season (SaaS rental)',
    connectivity: 'Cellular gateway + BLE in-hive beacons',
    acousticAnalysis: 'Proprietary sound algorithms for frames, closed cloud',
    environmentalBioMesh: 'Single-farm pollination intensity only; no regional smoke/chemical drift mesh',
    ruralYouthModel: 'Closed venture model for large commercial almond orchards; unaffordable for rural beekeepers',
    limitations: 'High recurring SaaS cost, closed proprietary hardware, requires frequent battery replacement (non-solar).',
  },
  {
    company: 'Arnia Beehive Monitoring',
    origin: 'United Kingdom',
    hardwareCost: '$350 - $520 per hive + subscription',
    connectivity: 'GPRS / 3G / 4G cellular hub + wireless sensor links',
    acousticAnalysis: 'Colony acoustic buzz frequency logging (graph display in portal)',
    environmentalBioMesh: 'Hive-centric only; no macro bio-sensor environmental correlation or plume tracking',
    ruralYouthModel: 'No local manufacturing or youth empowerment program',
    limitations: 'Prohibitive hardware cost for smallholders; dependent on cellular reception and primary lithium batteries.',
  },
  {
    company: 'ApisProtect',
    origin: 'Ireland',
    hardwareCost: '€120+ hardware setup + annual SaaS per hive',
    connectivity: 'LoRaWAN base station to proprietary cloud server',
    acousticAnalysis: 'Temperature & movement heuristics; limited raw spectral harmonic bifurcation',
    environmentalBioMesh: 'Monitors hive condition internally; does not map surrounding agrochemical drift or wildfire risk',
    ruralYouthModel: 'Corporate enterprise model targeting commercial beekeepers with >500 hives',
    limitations: 'High upfront cost; does not include continuous colony mass scale or VOC air toxicity sensor in standard unit.',
  },
  {
    company: 'OSBeehives (BuzzBox)',
    origin: 'Open Source / United States',
    hardwareCost: '$120 - $180 historical kit (largely discontinued)',
    connectivity: 'Wi-Fi / 2G cellular (inconsistent rural range)',
    acousticAnalysis: 'Audio recording sample upload to cloud server',
    environmentalBioMesh: 'Basic temperature/humidity; no 4-point precision load cell or multi-gas VOC array',
    ruralYouthModel: 'Open source schematics, but lacked localized rural youth assembly supply chain',
    limitations: 'Power-hungry Wi-Fi/GSM modules required frequent recharging; lack of integrated MPPT solar harvesting.',
  },
  {
    company: 'BroodMinder',
    origin: 'United States',
    hardwareCost: '$180 - $250 per hive (scale + internal probe)',
    connectivity: 'Bluetooth Low Energy (manual phone scan or $150 solar cellular hub)',
    acousticAnalysis: 'No acoustic sensing in base units (relies strictly on internal temperature and weight)',
    environmentalBioMesh: 'Citizen science hive data share; no real-time wildfire/chemical drift alert engine',
    ruralYouthModel: 'Consumer hobbyist retail distribution',
    limitations: 'Lacks real-time acoustic swarm detection; manual BLE sync limits emergency real-time alert delivery.',
  },
];

export const NOVELTY_PATENT_CLAIMS = [
  {
    claimNumber: 'Claim 1 (System Novelty)',
    title: 'Dual-Domain Biological & Environmental Transduction Network',
    description:
      'A distributed network comprising a plurality of self-powered apicultural sensor nodes deployed across an ecological perimeter, wherein each node measures both internal colony physiological metrics (brood temperature, weight dynamics, acoustic vibration) and ambient environmental indicators (VOC indices, particulate smoke, barometric pressure), configured to correlate worker bee flight kinetics with macroscopic environmental hazard vectors including agrochemical spray plumes and wildfire boundaries.',
    status: 'Core Novelty - High Patentability Index',
  },
  {
    claimNumber: 'Claim 2 (Acoustic Method Novelty)',
    title: 'Sub-50mW Edge Spectral Harmonic Bifurcation for Swarm Pre-Warning',
    description:
      'An embedded edge inference method executed on an ultra-low-power dual-core microcontroller comprising capturing 24-bit I2S acoustic telemetry from a digital MEMS transducer inside a brood chamber, computing a 512-point fixed-point Fast Fourier Transform (FFT) over the 100 Hz to 1000 Hz biological bandwidth, and evaluating a mathematical ratio of harmonic energy concentration at 450–550 Hz relative to baseline worker drone frequencies at 200–250 Hz to classify swarm departure readiness at least 3 hours prior to physical colony bifurcation.',
    status: 'High Technical Novelty - Method Claim',
  },
  {
    claimNumber: 'Claim 3 (Power & Telemetry Architecture)',
    title: 'Autonomous Multi-Seasonal Micro-MPPT LoRa Transceiver Topology',
    description:
      'A solar-harvesting apiary node topology integrating an ETFE-laminated monocrystalline transducer, dynamic Maximum Power Point Tracking (MPPT) circuit, and LiFePO4 electrochemical cell with ultra-low quiescent deep sleep (<15μA) and adaptive-interval LoRaWAN frequency hopping, enabling indefinite continuous operation in dense forest canopy without manual maintenance cycles.',
    status: 'System Architecture & Apparatus Claim',
  },
];
