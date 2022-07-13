import clsx from 'clsx';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { useOuterClick } from '~/shared/hooks';

import { Field } from './Field';

type FormProps<TFormValues> = PropsWithChildren<{
  className?: string;
  resetOnSubmitSuccessful?: boolean;
  onSubmit: SubmitHandler<TFormValues>;
  onBlur?: () => void;
}> &
  UseFormReturn<TFormValues>;

const Form = <TFormValues extends Record<string, any>>({
  className,
  resetOnSubmitSuccessful,
  children,
  onSubmit,
  onBlur,
  ...methods
}: FormProps<TFormValues>) => {
  const {
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  // reset form
  useEffect(() => {
    if (resetOnSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset, resetOnSubmitSuccessful]);

  // OnBlur when click outside form
  const wrapperRef = useRef<HTMLFormElement | null>(null);
  useOuterClick<HTMLFormElement>(wrapperRef, () => onBlur && onBlur());

  return (
    <FormProvider {...methods}>
      <form
        className={clsx('flex w-full', className)}
        ref={wrapperRef}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

Form.Field = Field;

export { Form };
