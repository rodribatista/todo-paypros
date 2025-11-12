export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export class TaskEntity {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: TaskStatus,
    public dueDate: Date,
    public readonly userId: string,
  ) {}
}
