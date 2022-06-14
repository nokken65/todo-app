import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{ className?: string | null | boolean }>;

const Card = ({ className, children }: CardProps) => {
  return (
    <article
      className={clsx(
        'flex flex-col w-full gap-2 p-6 h-fit rounded-xl bg-gray-pale',
        className,
      )}
    >
      {children}
    </article>
  );
};

export { Card };
