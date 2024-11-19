import { ReminderDeliveryType, ReminderPriorityType, ReminderStatus, ReminderType } from "@prisma/client";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateReminderDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(ReminderPriorityType)
  @IsOptional()
  priority: ReminderPriorityType;

  @IsEnum(ReminderType)
  @IsOptional()
  type: ReminderType;

  @IsEnum(ReminderDeliveryType)
  @IsOptional()
  delivery: ReminderDeliveryType;

  @IsNumber()
  @IsOptional()
  deliveryOffset: number;

  @IsDate()
  @IsOptional()
  schedule: Date;

  @IsEnum(ReminderStatus)
  @IsOptional()
  status: ReminderStatus;
}
