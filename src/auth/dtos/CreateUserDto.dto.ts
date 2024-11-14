import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
