import { featureGates } from './feature-gates';

export const aiQualityFeature = {
  canEvaluate: () => featureGates.isEnabled('aiQuality'),
  stage: () => featureGates.stage('aiQuality'),
};
