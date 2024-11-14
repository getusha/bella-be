import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [
    AuthService,
    OAuth2Client,
    PrismaService,
    JwtService,
    AuthGuard,
    UsersService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
