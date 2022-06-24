import clsx from 'clsx';
import { ReactNode } from 'react';
import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

import { InputField, InputFieldProps } from '~/shared/components';

export type FieldProps = Omit<InputFieldProps, 'name'> & {
  name: FieldPath<FieldValues>;
  label?: ReactNode;
  requiredStar?: boolean;
};

export const Field = ({
  name,
  label,
  requiredStar = false,
  ...props
}: FieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <div className='relative flex flex-col gap-2 w-full h-full'>
          {label && (
            <label className='text-sm text-gray-400 ' htmlFor={name}>
              {label}
              {requiredStar && <sup>*</sup>}
            </label>
          )}
          <InputField
            className={clsx('h-10', props.className)}
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
