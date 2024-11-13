import { Body, Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { };

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() { };

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const token = await this.authService.signInWithGoogle(req.user);

      if (!token) {
        return res.status(HttpStatus.BAD_REQUEST).send('Error generating JWT token');
      }

      res.cookie('access_token', token, {
        maxAge: 2592000000, // 30 days
        sameSite: true,
        secure: false, // TODO - Set to true in production with HTTPS
        httpOnly: true,
      });

      return res.status(HttpStatus.OK).send('Successfully logged in');
    } catch (error) {
      console.error('Error in Google Auth callback:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Something went wrong during login');
    }
  }
}
