import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionSchema, PERMISSION_MODEL } from './permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PERMISSION_MODEL, schema: PermissionSchema },
    ]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
