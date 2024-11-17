import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from 'src/auth/dtos/CreateUserDto.dto';
import { UsersService } from 'src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfileDetails(@Req() req: any) {
    return await this.usersService.findOne(null, req.decodedData.id);
  }

  @Patch('profile')
  async updateProfileDetails(
    @Req() req: any,
    @Body() updatedProfile: Partial<CreateUserDto>,
  ) {
    return await this.usersService.updateOne(
      req.decodedData.id,
      updatedProfile,
    );
  }
}
