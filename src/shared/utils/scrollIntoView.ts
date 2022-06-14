import { RefObject } from 'react';

export const scrollIntoView = (ref: RefObject<HTMLElement>) => {
  ref.current?.scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'center',
  });
};
