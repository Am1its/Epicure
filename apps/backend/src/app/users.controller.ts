import { Controller, Get, Param } from '@nestjs/common';
import type { User } from '@org/shared-types'; 

@Controller('users') 
export class UsersController { 
  @Get(':id') 
  getUser(@Param('id') id: string): User { 
    return { 
      id, 
      name: 'John', 
      email: 'john@example.com' 
    }; 
  } 
}