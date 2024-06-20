import { FeatureToggleContext } from 'context/FeatureToggleProvider';
import { useContext } from 'react';

type UseFeatureToggleReturn = {
  isEnabled: (featureName: string) => boolean;
  enableFeature: (featureName: string) => void;
  disableFeature: (featureName: string) => void;
};

function useFeatureToggle(): UseFeatureToggleReturn {
  const { enabledFeatures, enableFeature, disableFeature } = useContext(FeatureToggleContext);
  const isEnabled = (featureName: string): boolean => {
    return enabledFeatures.includes(featureName);
  };
  return {
    isEnabled,
    enableFeature,
    disableFeature,
  };
}

export default useFeatureToggle;
