import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ButtonWithLoader } from '~/shared/components';
import { ROUTE_PATHS } from '~/shared/constants';
import { ArrowIcon } from '~/shared/icons';
import { Form } from '~/shared/lib';

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
    <Form
      {...methods}
      onSubmit={async (data) => {
        await onSubmit(data);
        navigate(ROUTE_PATHS.index);
      }}
    >
      <Form.Field
        autoFocus
        after={
          <ButtonWithLoader
            className='justify-center w-10 font-bold text-white bg-violet-600'
            disabled={isSubmitting}
            isLoading={isSubmitting}
            type='submit'
          >
            <ArrowIcon className='w-4 h-4' direction='right' />
          </ButtonWithLoader>
        }
        name='email'
        placeholder='example@mail.com'
        type='email'
      />
    </Form>
  );
};

export const SignInWithEmailForm = reflect({
  view: SignInWithEmailFormView,
  bind: { onSubmit: effects.signInWithEmailFx },
});
