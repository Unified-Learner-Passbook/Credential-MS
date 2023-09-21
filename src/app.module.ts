import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialsModule } from './credentials/credentials.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckUtilsService } from './credentials/utils/healthcheck.utils.service';
import { PrismaClient } from '@prisma/client';
import { RevocationListService } from './revocation-list/revocation-list.service';
import { RevocationListModule } from './revocation-list/revocation-list.module';
import { RevocationList } from './revocation-list/revocation-list.helper';
import { RevocationListImpl } from './revocation-list/revocation-list.impl';
import { IdentityUtilsService } from './credentials/utils/identity.utils.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CredentialsModule,
    TerminusModule,
    RevocationListModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, PrismaClient, HealthCheckUtilsService, RevocationListService, RevocationList, RevocationListImpl, IdentityUtilsService],
})
export class AppModule {}
