import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<HTMLAttributes<HTMLElement> & {}>;

const Card = ({ className, children }: CardProps) => {
  return <article className={clsx('card', className)}>{children}</article>;
};

export { Card };
