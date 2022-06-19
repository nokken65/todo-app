import { Heading } from '~/shared/components';

type ListOfTodosLabelProps = {
  label: string;
};

export const ListOfTodosLabel = ({ label }: ListOfTodosLabelProps) => {
  return (
    <Heading capitalize={false} className='!break-words' type='h2'>
      {label}
    </Heading>
  );
};
