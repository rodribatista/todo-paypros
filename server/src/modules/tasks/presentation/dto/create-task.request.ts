import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateTaskRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}
