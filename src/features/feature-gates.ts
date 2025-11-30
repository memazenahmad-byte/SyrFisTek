import { featureStages } from '@/lib/features';

export const featureGates = {
  isEnabled: (key: string) => featureStages[key]?.enabled ?? false,
  stage: (key: string) => featureStages[key]?.stage ?? 1,
};
