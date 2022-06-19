import { reflect } from '@effector/reflect';

import {
  Notification,
  notificationModel,
  NotificationToast,
} from '~/entities/Notification';
import { Portal } from '~/shared/lib';

type NotificationsProps = {
  notification: Notification | null;
  onClose: (props: Pick<Notification, 'id'>) => void;
};

const NotificationsView = ({ notification, onClose }: NotificationsProps) => {
  return (
    notification && (
      <Portal containerId='notify-root'>
        <NotificationToast
          key={notification.id}
          onClose={() => onClose({ id: notification.id })}
          {...notification}
        />
      </Portal>
    )
  );
};

export const Notifications = reflect({
  view: NotificationsView,
  bind: {
    notification: notificationModel.selectors.$latestNotification,
    onClose: notificationModel.events.removeNotification,
  },
});
