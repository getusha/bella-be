import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private oAuthClient: OAuth2Client,
    private jwtService: JwtService,
  ) {}

  async verifyGoogleToken(token: string) {
    const ticket = await this.oAuthClient.verifyIdToken({
      idToken: token,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid Google token');
    }

    const user = await this.createUser({
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
    });
    return {
      token: this.jwtService.sign(user, {
        secret: `${process.env.JWT_SECRET}`,
      }),
      ...user,
    };
  }

  async createUser(newUser) {
    const user = await this.prisma.user.create({
      data: newUser,
    });

    return user;
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
