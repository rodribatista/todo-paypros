import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
