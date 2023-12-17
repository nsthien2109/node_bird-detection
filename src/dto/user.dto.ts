import { IsNotEmpty, IsString, Length } from "class-validator";

export class UserRoleUpdateDTO {
  @IsNotEmpty()
  role: number;
}

export class UsernameUpdateDTO {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  username: string;
}

export class ChangePasswordDTO {
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
