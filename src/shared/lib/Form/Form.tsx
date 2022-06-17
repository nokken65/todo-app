import { PropsWithChildren, useEffect } from 'react';
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { Field } from './Field';

type FormProps<TFormValues> = PropsWithChildren<{
  resetOnSubmitSuccessful?: boolean;
  onSubmit: SubmitHandler<TFormValues>;
}> &
  UseFormReturn<TFormValues>;

const Form = <TFormValues extends Record<string, any>>({
  resetOnSubmitSuccessful,
  children,
  onSubmit,
  ...methods
}: FormProps<TFormValues>) => {
  const {
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (resetOnSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset, resetOnSubmitSuccessful]);

  return (
    <FormProvider {...methods}>
      <form
        className='flex flex-col w-full h-full gap-6'
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

Form.Field = Field;

export { Form };
