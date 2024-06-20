import React, { useCallback, useMemo, useState, type ReactNode } from 'react';

export const FeatureToggleContext = React.createContext({
  enabledFeatures: [] as string[],
  enableFeature: (_featureName: string): void => undefined,
  disableFeature: (_featureName: string): void => undefined,
});

type FeatureToggleProviderProps = {
  children: ReactNode;
};

const enabledFeatures: string[] = [];

function FeatureToggleProvider({ children }: FeatureToggleProviderProps): JSX.Element {
  const [activeFeatures, setActiveFeatures] = useState(enabledFeatures);
  const enableFeature = useCallback(
    (featureName: string) => {
      setActiveFeatures([...activeFeatures, featureName]);
    },
    [activeFeatures],
  );

  const disableFeature = useCallback(
    (featureName: string) => {
      setActiveFeatures(activeFeatures.filter(feature => feature !== featureName));
    },
    [activeFeatures],
  );

  const memoContextValue = useMemo(() => {
    return {
      enabledFeatures: activeFeatures,
      enableFeature,
      disableFeature,
    };
  }, [activeFeatures, enableFeature, disableFeature]);

  return (
    <FeatureToggleContext.Provider value={memoContextValue}>
      {children}
    </FeatureToggleContext.Provider>
  );
}

export default FeatureToggleProvider;
