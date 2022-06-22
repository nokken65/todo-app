import { createApi, createStore, Event, Store } from 'effector';

export type CreateFormStateReturn = {
  id: string;
  $isOpen: Store<boolean>;
  open: Event<void>;
  close: Event<void>;
};

export type CreateFormStateInitial = {
  isOpen?: boolean;
};

type CreateFormStateProps = {
  initials?: CreateFormStateInitial;
};

export const createFormState = (
  id: string,
  props?: CreateFormStateProps,
): CreateFormStateReturn => {
  const $isOpen = createStore<boolean>(props?.initials?.isOpen ?? false, {
    name: id,
  });
  const { open, close } = createApi($isOpen, {
    open: () => true,
    close: () => false,
  });

  return { id, $isOpen, open, close };
};
