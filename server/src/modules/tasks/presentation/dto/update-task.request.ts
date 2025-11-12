import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateTaskRequest {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate: string;
}
