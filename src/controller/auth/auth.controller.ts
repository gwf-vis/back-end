import { Controller, Get } from '@nestjs/common';
import { RoleService } from '@repository/role/role.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getRoles() {
    return this.roleService.find({});
  }
}
