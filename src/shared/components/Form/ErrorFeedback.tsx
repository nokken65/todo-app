import clsx from 'clsx';

type ErrorFeedbackProps = {
  message?: string;
  className?: string;
};

export const ErrorFeedback = ({
  message = 'error',
  className,
}: ErrorFeedbackProps) => {
  return (
    <span className={clsx('text-sm text-red-500', className)}>{message}</span>
  );
};
