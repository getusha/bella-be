import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dtos';
import * as argon from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) { };

  generateJwt(payload) {
    return this.jwtService.sign(payload);
  }

  async signInWithGoogle(profile) {
    const { email, firstName, lastName, profilePicture } = profile;

    try {
      const userExist = await this.prisma.user.findUnique({
        where: { email }
      });

      if (userExist) {
        return this.generateJwt({
          sub: userExist.id,
          email: userExist.email
        });
      }

      const user = await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          profilePicture,
          language: 'ENGLISH',
          accountType: 'DEFAULT',
        },
      });

      return this.generateJwt({
        sub: user.id,
        email: user.email
      });
    } catch (error) {
      console.error('Error in signInWithGoogle: ', error);
      throw new InternalServerErrorException();
    }
  }


  // TODO - add validation
  async signIn(user) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        email: user.email
      }
    });

    if (!userExist) throw new HttpException(
      'No account found with this email address. Please create an account to continue.',
      HttpStatus.NOT_FOUND
    );

    return this.generateJwt({
      sub: userExist.id,
      email: userExist.email
    });
  };

  async registerUser(dto: RegisterUserDto) {
    const { firstName, lastName, phoneNumber, email, password, language, accountType } = dto;


    try {
      const userExist = await this.prisma.user.findUnique({
        where: {
          email: dto.email
        }
      });

      if (userExist) throw new HttpException(
        'An account with this email address already exists. Please use a different email or try to log in.',
        HttpStatus.BAD_REQUEST
      );

      const hashedPassword = await argon.hash(password);

      const user = await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          phoneNumber,
          email,
          password: hashedPassword,
          language,
          accountType
        }
      });

      return this.generateJwt({
        sub: user.id,
        email: user.email
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
