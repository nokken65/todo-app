import { reflect } from '@effector/reflect';

import { Progress } from '~/shared/components';

import { $progress } from './model';

type ProgressTodoCompletionProps = {
  progressValue: number;
};

const ProgressTodoCompletionView = ({
  progressValue,
}: ProgressTodoCompletionProps) => {
  return <Progress value={progressValue} />;
};

export const ProgressTodoCompletion = reflect({
  view: ProgressTodoCompletionView,
  bind: {
    progressValue: $progress,
  },
});
