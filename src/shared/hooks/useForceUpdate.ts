import { useCallback, useState } from 'react';

export const useForceUpdate = () => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState(undefined), []);

  return forceUpdate;
};
