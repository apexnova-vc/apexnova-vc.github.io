import React, {ComponentType, lazy, Suspense} from 'react';

// useLazy hook to dynamically import a component
export const useLazy = <T extends ComponentType<any>> (importFunc: () => Promise<{default: T}>) => {
  const LazyComponent = lazy(importFunc);
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
