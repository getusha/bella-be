import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReminderDto } from 'src/reminders/dtos/CreateReminderDto.dto';

@Injectable()
export class RemindersService {
  constructor(private prismaService: PrismaService) {}

  async createOne(reminder: ReminderDto) {
    return await this.prismaService.reminder.create({
      data: reminder,
    });
  }

  async findOne(id: ReminderDto['ownerId']) {
    return await this.prismaService.reminder.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findMany(ownerId: ReminderDto['ownerId']) {
    return await this.prismaService.reminder.findMany({
      where: {
        ownerId,
      },
    });
  }

  async deleteOne(reminderId: ReminderDto['ownerId']) {
    return await this.prismaService.reminder.delete({
      where: {
        id: reminderId,
      },
    });
  }
}
