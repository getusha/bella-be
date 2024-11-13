import { Body, Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {};

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {};

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      maxAge: 2592000000, // 30 days
      sameSite: true,
      secure: false, // TODO - set to true in production with HTTPS
      httpOnly: true
    });

    return res.status(HttpStatus.OK);
  }
}
