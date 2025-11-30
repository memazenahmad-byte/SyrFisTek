import { useMemo } from 'react';
import { featureStages } from '@/lib/features';

export function useFeatureFlag(featureKey: string) {
  return useMemo(() => featureStages[featureKey] ?? { stage: 1, enabled: true }, [featureKey]);
}
