import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
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

  @Post('edit')
  async edit(@Body() body: { id: ReminderDto["ownerId"], updatedReminder: Partial<ReminderDto> }) {
    const { id, ...updatedReminder } = body;
    return await this.remindersService.edit(id, updateReminder);
  }

  @Get(':id')
  async findOne(@Param('id') id: ReminderDto['ownerId']) {
    const reminder = await this.remindersService.findOne(id)

    if(!reminder) {
        throw new NotFoundException();
    }

    return await this.remindersService.findOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') reminderId: ReminderDto['ownerId']) {
    return await this.remindersService.deleteOne(reminderId);
  }

  @Get()
  async findMany(@Req() req: any) {
    return await this.remindersService.findMany(req.decodedData.id);
  }
}
