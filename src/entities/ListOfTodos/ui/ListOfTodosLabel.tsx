import { ReactNode } from 'react';

import { Heading } from '~/shared/components';

type ListOfTodosLabelProps = {
  label: string;
  isEdit?: boolean;
  form?: ReactNode;
};

export const ListOfTodosLabel = ({
  label,
  isEdit = false,
  form,
}: ListOfTodosLabelProps) => {
  return (
    <>
      {!isEdit && (
        <Heading className='break-words' type='h2'>
          {label}
        </Heading>
      )}
      {isEdit && form}
    </>
  );
};
