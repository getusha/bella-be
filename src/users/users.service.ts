import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dtos/CreateUserDto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReminderDto } from 'src/reminders/dtos/CreateReminderDto.dto';
import { UpdateProfileDto } from './dtos/UpdateProfile.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createOne(newUser: CreateUserDto) {
    return await this.prismaService.user.create({
      data: newUser,
    });
  }

  async findOne(email?: string, id?: string) {
    return await this.prismaService.user.findUnique({
      where: {
        ...(email ? { email } : { id }),
      },
    });
  }

  async updateOne(
    userId: ReminderDto['ownerId'],
    updatedProfile: UpdateProfileDto,
  ) {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: updatedProfile,
    });
  }
}
