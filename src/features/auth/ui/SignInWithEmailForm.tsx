import { reflect } from '@effector/reflect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '~/shared/components';
import { ROUTE_PATHS } from '~/shared/constants';
import { ArrowIcon } from '~/shared/icons';
import { Form } from '~/shared/lib';

import { effects } from '../model';
import { SignInWithEmailInputs } from '../model/model';
import { signInWithEmailSchema } from '../validation';

type SignInWithEmailFormProps = {
  onSubmit: (props: SignInWithEmailInputs) => Promise<{
    params: SignInWithEmailInputs;
  }>;
};

const SignInWithEmailFormView = ({ onSubmit }: SignInWithEmailFormProps) => {
  const methods = useForm<SignInWithEmailInputs>({
    mode: 'onChange',
    resolver: yupResolver(signInWithEmailSchema),
    defaultValues: { email: '' },
  });

  const navigate = useNavigate();

  return (
    <Form
      {...methods}
      resetOnSubmitSuccessful
      onSubmit={async (data) => {
        await onSubmit(data);
        navigate(ROUTE_PATHS.index);
      }}
    >
      <Form.Field
        autoFocus
        after={
          <Button
            htmlType='submit'
            icon={<ArrowIcon className='w-4 h-4' direction='right' />}
            isLoading={methods.formState.isSubmitting}
            rounded={false}
          />
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
