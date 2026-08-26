export const estimateProjectTypes = [
  { id: 'kitchen-backsplash', baseMin: 900, baseMax: 2800, weeksMin: 1, weeksMax: 2 },
  { id: 'bathroom-backsplash', baseMin: 700, baseMax: 2200, weeksMin: 1, weeksMax: 2 },
  { id: 'custom-shower', baseMin: 3800, baseMax: 10500, weeksMin: 1, weeksMax: 3 },
  { id: 'tub-to-shower', baseMin: 4500, baseMax: 12000, weeksMin: 2, weeksMax: 4 },
  { id: 'full-bathroom', baseMin: 9000, baseMax: 28000, weeksMin: 2, weeksMax: 5 },
  { id: 'floor-tile', baseMin: 2200, baseMax: 9000, weeksMin: 1, weeksMax: 3 },
  { id: 'whole-home-flooring', baseMin: 8000, baseMax: 32000, weeksMin: 2, weeksMax: 6 },
  { id: 'kitchen-floor', baseMin: 3500, baseMax: 12000, weeksMin: 1, weeksMax: 3 },
  { id: 'laundry-mudroom', baseMin: 1800, baseMax: 6500, weeksMin: 1, weeksMax: 2 },
  { id: 'fireplace-accent', baseMin: 1200, baseMax: 4500, weeksMin: 1, weeksMax: 2 },
  { id: 'outdoor-patio', baseMin: 4000, baseMax: 14000, weeksMin: 2, weeksMax: 4 },
  { id: 'tile-repair', baseMin: 450, baseMax: 2200, weeksMin: 1, weeksMax: 1 },
  { id: 'commercial-restroom', baseMin: 12000, baseMax: 45000, weeksMin: 2, weeksMax: 6 },
  { id: 'commercial-locker-room', baseMin: 15000, baseMax: 55000, weeksMin: 3, weeksMax: 8 },
  { id: 'commercial-lobby', baseMin: 10000, baseMax: 38000, weeksMin: 2, weeksMax: 5 },
  { id: 'commercial-facility', baseMin: 25000, baseMax: 95000, weeksMin: 4, weeksMax: 12 },
] as const;

export const estimateSizes = [
  { id: 'compact', multiplier: 0.78, weeksMultiplier: 0.85 },
  { id: 'standard', multiplier: 1, weeksMultiplier: 1 },
  { id: 'large', multiplier: 1.38, weeksMultiplier: 1.2 },
  { id: 'extra-large', multiplier: 1.85, weeksMultiplier: 1.45 },
] as const;

export const estimateTimelines = [
  { id: 'asap', costMultiplier: 1.12, weeksMultiplier: 0.9 },
  { id: 'one-to-three-months', costMultiplier: 1, weeksMultiplier: 1 },
  { id: 'three-to-six-months', costMultiplier: 0.97, weeksMultiplier: 1.05 },
  { id: 'planning-ahead', costMultiplier: 0.94, weeksMultiplier: 1.1 },
] as const;

export const estimateTileMaterials = [
  { id: 'ceramic', multiplier: 0.92 },
  { id: 'porcelain', multiplier: 1 },
  { id: 'natural-stone', multiplier: 1.38 },
  { id: 'large-format', multiplier: 1.15 },
  { id: 'mosaic-custom', multiplier: 1.42 },
] as const;

export const estimateAddons = [
  { id: 'demolition', minAdd: 900, maxAdd: 3200, weeksAdd: 0.25 },
  { id: 'waterproofing', minAdd: 650, maxAdd: 2400, weeksAdd: 0.15 },
  { id: 'heated-floor', minAdd: 550, maxAdd: 1800, weeksAdd: 0.1 },
  { id: 'custom-pattern', minAdd: 500, maxAdd: 2200, weeksAdd: 0.2 },
  { id: 'niche-bench', minAdd: 350, maxAdd: 1400, weeksAdd: 0.1 },
  { id: 'weekend-after-hours', minAdd: 0, maxAdd: 0, costMultiplier: 1.14, weeksAdd: 0 },
] as const;

export type EstimateProjectTypeId = (typeof estimateProjectTypes)[number]['id'];
export type EstimateSizeId = (typeof estimateSizes)[number]['id'];
export type EstimateTimelineId = (typeof estimateTimelines)[number]['id'];
export type EstimateTileMaterialId = (typeof estimateTileMaterials)[number]['id'];
export type EstimateAddonId = (typeof estimateAddons)[number]['id'];
export type EstimatePropertyType = 'residential' | 'commercial';

export interface EstimateInput {
  projectType: EstimateProjectTypeId;
  propertyType: EstimatePropertyType;
  size: EstimateSizeId;
  timeline: EstimateTimelineId;
  tileMaterial: EstimateTileMaterialId;
  addons: EstimateAddonId[];
}

export interface EstimateBreakdownItem {
  id: string;
  impact: 'base' | 'increase' | 'decrease';
  minDelta: number;
  maxDelta: number;
}

export interface EstimateResult {
  minCost: number;
  maxCost: number;
  weeksMin: number;
  weeksMax: number;
  breakdown: EstimateBreakdownItem[];
}

function roundCost(value: number): number {
  return Math.round(value / 50) * 50;
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const project =
    estimateProjectTypes.find((item) => item.id === input.projectType) ?? estimateProjectTypes[0];
  const size = estimateSizes.find((item) => item.id === input.size) ?? estimateSizes[1];
  const timeline =
    estimateTimelines.find((item) => item.id === input.timeline) ?? estimateTimelines[1];
  const tile =
    estimateTileMaterials.find((item) => item.id === input.tileMaterial) ??
    estimateTileMaterials[1];

  const propertyMultiplier = input.propertyType === 'commercial' ? 1.22 : 1;
  const breakdown: EstimateBreakdownItem[] = [];

  let minCost = project.baseMin * size.multiplier * timeline.costMultiplier * tile.multiplier;
  let maxCost = project.baseMax * size.multiplier * timeline.costMultiplier * tile.multiplier;
  breakdown.push({
    id: 'base',
    impact: 'base',
    minDelta: minCost,
    maxDelta: maxCost,
  });

  if (propertyMultiplier !== 1) {
    const prevMin = minCost;
    const prevMax = maxCost;
    minCost *= propertyMultiplier;
    maxCost *= propertyMultiplier;
    breakdown.push({
      id: 'commercial',
      impact: 'increase',
      minDelta: minCost - prevMin,
      maxDelta: maxCost - prevMax,
    });
  }

  if (timeline.costMultiplier !== 1) {
    breakdown.push({
      id: input.timeline,
      impact: timeline.costMultiplier > 1 ? 'increase' : 'decrease',
      minDelta: project.baseMin * size.multiplier * (timeline.costMultiplier - 1) * tile.multiplier * propertyMultiplier,
      maxDelta: project.baseMax * size.multiplier * (timeline.costMultiplier - 1) * tile.multiplier * propertyMultiplier,
    });
  }

  if (tile.multiplier !== 1) {
    breakdown.push({
      id: input.tileMaterial,
      impact: tile.multiplier > 1 ? 'increase' : 'decrease',
      minDelta:
        project.baseMin * size.multiplier * timeline.costMultiplier * (tile.multiplier - 1) * propertyMultiplier,
      maxDelta:
        project.baseMax * size.multiplier * timeline.costMultiplier * (tile.multiplier - 1) * propertyMultiplier,
    });
  }

  let weeksMin = project.weeksMin * size.weeksMultiplier * timeline.weeksMultiplier;
  let weeksMax = project.weeksMax * size.weeksMultiplier * timeline.weeksMultiplier;

  for (const addonId of input.addons) {
    const addon = estimateAddons.find((item) => item.id === addonId);
    if (!addon) continue;

    if (addon.minAdd || addon.maxAdd) {
      minCost += addon.minAdd;
      maxCost += addon.maxAdd;
      breakdown.push({
        id: addonId,
        impact: 'increase',
        minDelta: addon.minAdd,
        maxDelta: addon.maxAdd,
      });
    }

    if ('costMultiplier' in addon && addon.costMultiplier) {
      const prevMin = minCost;
      const prevMax = maxCost;
      minCost *= addon.costMultiplier;
      maxCost *= addon.costMultiplier;
      breakdown.push({
        id: addonId,
        impact: 'increase',
        minDelta: minCost - prevMin,
        maxDelta: maxCost - prevMax,
      });
    }

    weeksMin += addon.weeksAdd;
    weeksMax += addon.weeksAdd;
  }

  return {
    minCost: roundCost(minCost),
    maxCost: roundCost(Math.max(minCost + 500, maxCost)),
    weeksMin: Math.max(1, Math.round(weeksMin)),
    weeksMax: Math.max(Math.round(weeksMin), Math.round(weeksMax)),
    breakdown,
  };
}

export const defaultEstimateInput: EstimateInput = {
  projectType: 'full-bathroom',
  propertyType: 'residential',
  size: 'standard',
  timeline: 'one-to-three-months',
  tileMaterial: 'porcelain',
  addons: [],
};
