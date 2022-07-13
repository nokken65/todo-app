import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

import { InputField, InputFieldProps } from '~/shared/components';

export type FieldProps = Omit<InputFieldProps, 'name'> & {
  name: FieldPath<FieldValues>;
};

export const Field = ({ name, ...props }: FieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <InputField
          className={props.className}
          errorMessage={fieldState.error?.message}
          id={name}
          isSubmitting={formState.isSubmitting}
          isValid={!fieldState.error && fieldState.isDirty}
          {...props}
          {...field}
        />
      )}
    />
  );
};
