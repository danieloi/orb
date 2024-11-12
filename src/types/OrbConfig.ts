export interface OrbConfig {
  backgroundColors: string[];
  glowColor: string;
  particleColor: string;
  coreGlowIntensity: number;
  showBackground: boolean;
  showWavyBlobs: boolean;
  showParticles: boolean;
  showGlowEffects: boolean;
  showShadow: boolean;
  speed: number;
}

export const defaultOrbConfig: OrbConfig = {
  backgroundColors: ["#22d3ee", "#818cf8", "#f472b6"],
  glowColor: "#ffffff",
  particleColor: "#ffffff",
  coreGlowIntensity: 1.2,
  showBackground: true,
  showWavyBlobs: true,
  showParticles: true,
  showGlowEffects: true,
  showShadow: true,
  speed: 50,
};
