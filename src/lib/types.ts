export interface User {
  id: string;
  name: string;
  companyId: string;
}

export interface FeatureToggle {
  key: string;
  stage: number;
  enabled: boolean;
}
