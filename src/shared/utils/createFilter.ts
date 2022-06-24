import { createApi, createStore } from 'effector';

import { TodoList } from '../types';

type CreateFilterStateInitial = {
  isActive?: boolean;
};

type CreateFilterStateProps = {
  name: string;
  initials?: CreateFilterStateInitial;
  isFit: (item: TodoList) => boolean;
};

const createFilter = ({ initials, isFit }: CreateFilterStateProps) => {
  const $isActive = createStore<boolean>(initials?.isActive ?? false);

  const { activate, deactivate } = createApi($isActive, {
    activate: () => true,
    deactivate: () => false,
  });

  const apply = (isActive: boolean, items: TodoList[]) => {
    if (!isActive) {
      return items;
    }

    return items.filter((item) => isFit(item));
  };

  return { $isActive, activate, deactivate, apply };
};

type Filter = ReturnType<typeof createFilter>;

export type { Filter };
export { createFilter };
