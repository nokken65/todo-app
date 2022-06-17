import './styles/index.scss';

import { reflect } from '@effector/reflect';
import type { ReactNode } from 'react';

import {
  Notification,
  notificationModel,
  NotificationToast,
} from '~/entities/Notification';
import { userModel } from '~/entities/User';
import { Routing } from '~/pages';
import { Portal } from '~/shared/lib';

import { withProviders } from './providers';

type PureAppProps = {
  notifications: Notification[];
  onClose: (props: Pick<Notification, 'id'>) => void;
};

const PureAppView = ({ notifications, onClose }: PureAppProps) => {
  return (
    <>
      <Routing />
      <Portal containerId='notify-root'>
        <div className='flex flex-col gap-2 pb-6'>
          {notifications.map((item) => (
            <NotificationToast
              key={item.id}
              onClose={() => onClose({ id: item.id })}
              {...item}
            />
          ))}
        </div>
      </Portal>
    </>
  );
};

const PureApp = reflect({
  view: PureAppView,
  bind: {
    notifications: notificationModel.selectors.$notifications,
    onClose: notificationModel.events.removeNotification,
  },
  hooks: {
    mounted: () => {
      userModel.effects.getUserFx();
      userModel.events.subscribeUserAuthStateListener();
    },
    unmounted: userModel.events.unsubscribeUserAuthStateListener.prepend(
      () => null,
    ),
  },
});

export const App = withProviders(
  PureApp as () => ReactNode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as React.ComponentType<any>;
