import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '~/shared/components';
import { ROUTE_PATHS } from '~/shared/constants';
import { ArrowIcon, LoaderRingIcon } from '~/shared/icons';
import { ReactHookFormField } from '~/shared/lib';

import { effects } from '../model';
import { SignInWithEmailInputs } from '../model/model';
import { signInWithEmailSchema } from '../validation';

type SignInWithEmailFormProps = {
  onSubmit: (props: SignInWithEmailInputs) => Promise<void>;
};

const SignInWithEmailFormView = ({ onSubmit }: SignInWithEmailFormProps) => {
  const methods = useForm<SignInWithEmailInputs>({
    mode: 'onChange',
    resolver: yupResolver(signInWithEmailSchema),
    defaultValues: { email: '' },
  });

  const navigate = useNavigate();

  const {
    reset,
    formState: { isSubmitSuccessful, isSubmitting },
  } = methods;

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <FormProvider {...methods}>
      <form
        className='flex flex-col w-full h-full gap-6'
        onSubmit={methods.handleSubmit(async (data) => {
          await onSubmit(data);
          navigate(ROUTE_PATHS.index);
        })}
      >
        <ReactHookFormField
          autoFocus
          after={
            <Button
              className='justify-center w-10 font-bold text-white bg-violet-600 p-0 disabled:grayscale-0'
              disabled={isSubmitting}
              type='submit'
            >
              {isSubmitting ? (
                <LoaderRingIcon className='w-6 h-6 animate-spin-fast' />
              ) : (
                <ArrowIcon className='w-4 h-4' direction='right' />
              )}
            </Button>
          }
          name='email'
          placeholder='example@mail.com'
          type='email'
        />
      </form>
    </FormProvider>
  );
};

export const SignInWithEmailForm = reflect({
  view: SignInWithEmailFormView,
  bind: { onSubmit: effects.signInWithEmailFx },
});
