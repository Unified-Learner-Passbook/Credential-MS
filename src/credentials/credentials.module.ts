import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { HttpModule } from '@nestjs/axios';
import { IdentityUtilsService } from './utils/identity.utils.service';
import { RenderingUtilsService } from './utils/rendering.utils.service';
import { SchemaUtilsSerivce } from './utils/schema.utils.service';
import { PrismaClient } from '@prisma/client';
import { HealthCheckUtilsService } from './utils/healthcheck.utils.service';

@Module({
  imports: [HttpModule],
  providers: [CredentialsService, PrismaClient, IdentityUtilsService, RenderingUtilsService, SchemaUtilsSerivce, HealthCheckUtilsService],
  controllers: [CredentialsController],
  exports: [HealthCheckUtilsService]
})
export class CredentialsModule {}
