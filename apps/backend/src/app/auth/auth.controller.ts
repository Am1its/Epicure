import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthResponse } from '@org/shared-types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }): Promise<AuthResponse> {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  register(
    @Body() body: { name: string; email: string; password: string },
  ): Promise<AuthResponse> {
    return this.authService.register(body.name, body.email, body.password);
  }
}
