const TaskStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export interface TaskModel {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
}
