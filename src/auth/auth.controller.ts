import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Post('edit')
  async editProfile() {
    return 'authorized';
  }

  @Post('google')
  async authenticate(@Body() body: { token: string }) {
    const { token } = body;
    return await this.authService.verifyGoogleToken(token);
  }
}
