import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('admin/roles')
export class RolesAdminController {
  constructor(private readonly rolesService: RolesService) {}
}
