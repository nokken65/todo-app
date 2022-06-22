import './styles/index.scss';

import { reflect } from '@effector/reflect';
import { ReactNode } from 'react';

import { userModel } from '~/entities/User';
import { Routing } from '~/pages';

import { withProviders } from './providers';

const PureAppView = () => {
  return <Routing />;
};

const PureApp = reflect({
  view: PureAppView,
  bind: {},
  hooks: {
    mounted: () => {
      userModel.events.subscribeUserAuthStateListener();
    },
    unmounted: () => {
      userModel.events.unsubscribeUserAuthStateListener();
    },
  },
});

export const App = withProviders(
  PureApp as () => ReactNode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as React.ComponentType<any>;
