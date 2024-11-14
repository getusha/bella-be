import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { OAuth2Client } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [
    RemindersService,
    PrismaService,
    AuthGuard,
    AuthService,
    OAuth2Client,
    JwtService,
    UsersService,
  ],
  controllers: [RemindersController],
})
export class RemindersModule {}
