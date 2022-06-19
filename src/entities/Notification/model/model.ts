export type Notification = {
  id: string;
  type: 'error' | 'warn' | 'message';
  content: string;
  duration?: number;
};
