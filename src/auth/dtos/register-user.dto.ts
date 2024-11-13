import { AccountType, Languages } from "@prisma/client";

export class RegisterUserDto {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  language: Languages;
  accountType: AccountType;
}