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
import { UpdateProfileDto } from './dtos/UpdateProfile.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfileDetails(@Req() req: any) {
    return await this.usersService.findOne(null, req.decodedData.id);
  }

  @Patch('profile')
  async updateProfileDetails(
    @Req() req: any,
    @Body() updatedProfile: UpdateProfileDto,
  ) {
    return await this.usersService.updateOne(
      req.decodedData.id,
      updatedProfile,
    );
  }
}
