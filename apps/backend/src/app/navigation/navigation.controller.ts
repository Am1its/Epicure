import { Controller, Get } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import type { NavigationResponse } from '@org/shared-types';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  getNavigation(): Promise<NavigationResponse> {
    return this.navigationService.getNavigation();
  }
}
