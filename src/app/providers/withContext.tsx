import { ReactNode } from 'react';

const providers: any = [];

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
  children: React.ReactNode;
}

const Compose = ({ components = [], children }: Props) => {
  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};

export const withContext = (component: () => ReactNode) => () =>
  <Compose components={providers}>{component()}</Compose>;
