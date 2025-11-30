export type FeatureStage = 1 | 2 | 3;

export const featureStages: Record<string, { stage: FeatureStage; enabled: boolean }> = {
  marketplace: { stage: 1, enabled: true },
  auctions: { stage: 2, enabled: true },
  aiQuality: { stage: 3, enabled: false },
};
