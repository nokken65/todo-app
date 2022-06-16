import { ReactNode } from 'react';

export type PopoverActionButton = {
  name: string;
  content: ReactNode;
  className?: string;
  onAction?: () => void;
};

export type SocialButton = {
  text?: string;
  icon?: ReactNode;
  className?: string;
  action?: () => void;
};

export * from './supabaseTypes';
export * from './TextSize';
export * from './utility';
