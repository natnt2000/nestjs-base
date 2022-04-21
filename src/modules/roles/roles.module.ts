import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesAdminController } from './roles.admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema, ROLE_MODEL } from './role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ROLE_MODEL, schema: RoleSchema }]),
  ],
  controllers: [RolesAdminController],
  providers: [RolesService],
})
export class RolesModule {}
