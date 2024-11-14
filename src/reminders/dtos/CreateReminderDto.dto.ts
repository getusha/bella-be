import {
  IsUUID,
  IsString,
  IsEnum,
  IsInt,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import {
  ReminderPriorityType,
  ReminderType,
  ReminderDeliveryType,
  ReminderStatus,
} from '../../enums';

export class ReminderDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsEnum(ReminderPriorityType)
  priority: ReminderPriorityType;

  @IsEnum(ReminderType)
  type?: ReminderType = ReminderType.ONCE;

  @IsEnum(ReminderDeliveryType)
  delivery?: ReminderDeliveryType = ReminderDeliveryType.NOTIFICATION;

  @IsInt()
  deliveryOffset: number;

  @IsDate()
  schedule: Date;

  @IsEnum(ReminderStatus)
  status?: ReminderStatus = ReminderStatus.UPCOMING;

  @IsUUID()
  ownerId: string;
}
