import { MutableRefObject, useEffect } from 'react';

export const useOuterClick = <T extends HTMLElement>(
  ref: MutableRefObject<T | null>,
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    const listener: EventListenerOrEventListenerObject = (event: Event) => {
      if (!ref?.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
