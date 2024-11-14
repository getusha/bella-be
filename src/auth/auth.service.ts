import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private oAuthClient: OAuth2Client,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async verifyGoogleToken(token: string) {
    const ticket = await this.oAuthClient.verifyIdToken({
      idToken: token,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid Google token');
    }

    const { given_name, family_name, email } = payload;
    let user = await this.usersService.findOne(email);

    if (!user) {
      user = await this.usersService.createOne({
        firstName: given_name,
        lastName: family_name,
        email: email,
      });
    }

    return {
      accessToken: this.generateJwtToken({ email: user.email, id: user.id }),
      profile: user,
    };
  }

  generateJwtToken(user: { email: string; id: string }) {
    return this.jwtService.sign(user, {
      secret: `${process.env.JWT_SECRET}`,
    });
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
