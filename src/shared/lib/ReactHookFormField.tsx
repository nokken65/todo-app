import { ReactNode } from 'react';
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

import { Form, InputFieldProps } from '../components';

type ReactHookFormFieldProps = Omit<InputFieldProps, 'name'> & {
  name: FieldPath<FieldValues>;
  label?: ReactNode;
  requiredStar?: boolean;
};

export const ReactHookFormField = ({
  name,
  label,
  requiredStar = false,
  ...props
}: ReactHookFormFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <div className='flex flex-col gap-2 relative'>
          {label && (
            <label className='text-sm text-gray-400 ' htmlFor={name}>
              {label}
              {requiredStar && <sup>*</sup>}
            </label>
          )}
          <Form.InputField
            className='h-10'
            errorMessage={fieldState.error?.message}
            id={name}
            isSubmitting={formState.isSubmitting}
            isValid={!fieldState.error && fieldState.isDirty}
            {...props}
            {...field}
          />
        </div>
      )}
    />
  );
};
