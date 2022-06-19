import { FocusEvent, PropsWithChildren, useCallback } from 'react';

type ChildrenBlurProps = PropsWithChildren<{ onBlur: () => void }>;

export const ChildrenBlur = ({
  children,
  onBlur,
  ...props
}: ChildrenBlurProps) => {
  const handleBlur = useCallback(
    (e: FocusEvent) => {
      const { currentTarget } = e;

      // Give browser time to focus the next element
      requestAnimationFrame(() => {
        // Check if the new focused element is a child of the original container
        if (!currentTarget.contains(document.activeElement)) {
          onBlur();
        }
      });
    },
    [onBlur],
  );

  return (
    <div {...props} onBlur={handleBlur}>
      {children}
    </div>
  );
};
