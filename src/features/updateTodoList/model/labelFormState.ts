import { createApi, createStore } from 'effector';
import produce from 'immer';

import { todoListModel } from '~/entities/TodoList';

const $isOpen = createStore<Record<string, boolean>>({});

const { open, close } = createApi($isOpen, {
  open: (state, id: string) =>
    produce(state, (draft) => {
      draft[id] = true;
    }),
  close: (state, id: string) =>
    produce(state, (draft) => {
      draft[id] = false;
    }),
});

$isOpen.reset(todoListModel.effects.getTodoListsFx);

export const labelFormState = {
  $isOpen,
  open,
  close,
};
