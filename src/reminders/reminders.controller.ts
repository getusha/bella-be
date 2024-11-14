import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ReminderDto } from 'src/reminders/dtos/CreateReminderDto.dto';
import { RemindersService } from 'src/reminders/reminders.service';

@Controller('reminders')
@UseGuards(AuthGuard)
export class RemindersController {
  constructor(private remindersService: RemindersService) {}

  @Post('new')
  async createNew(@Body() body: ReminderDto) {
    return await this.remindersService.createOne(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: ReminderDto['ownerId']) {
    return await this.remindersService.findOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') reminderId) {
    return await this.remindersService.deleteOne(reminderId);
  }

  @Get()
  async findMany(ownerId: ReminderDto['ownerId']) {
    return await this.remindersService.findMany(ownerId);
  }
}
