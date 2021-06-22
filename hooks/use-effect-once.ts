import { DependencyList, EffectCallback, useEffect, useState } from "react";

export const useEffectOnce = (
  effect: EffectCallback,
  condition: boolean = true,
  deps: DependencyList = []
) => {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (!condition || fired) return;
    setFired(true);
    return effect();
  }, [fired, condition, ...deps]);
};
