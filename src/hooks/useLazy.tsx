/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType, lazy, Suspense, ReactElement } from "react";

// useLazy hook to dynamically import a component
export const useLazy = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  displayName?: string,
): ((props: React.ComponentProps<T>) => ReactElement) => {
  const LazyComponent = lazy(importFunc);

  // Component wrapper
  const ComponentWithSuspense = (
    props: React.ComponentProps<T>,
  ): ReactElement => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );

  // Assign a display name to the component
  ComponentWithSuspense.displayName = displayName || "LazyLoadedComponent";

  return ComponentWithSuspense;
};
