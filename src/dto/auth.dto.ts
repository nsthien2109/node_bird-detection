import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";
import { Role } from "../entity";

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  @Length(4, 10)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  role: Role;
}

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
