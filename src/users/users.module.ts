import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    AuthGuard,
    AuthService,
    OAuth2Client,
    JwtService,
  ],
})
export class UsersModule {}
