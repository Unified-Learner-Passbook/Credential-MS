import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { PrismaHealthIndicator } from 'prisma/prisma.health';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    private http: HttpHealthIndicator,
    private prismaIndicator: PrismaHealthIndicator,
    private healthCheckService: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    ) {}

  @Get('/health')
  @HealthCheck()
  @ApiOperation({ summary: 'Get Health Check Status' })
  @ApiResponse({ status: 200, description: 'Result Report for All the Health Check Services' })
  async checkHealth() {
    return this.healthCheckService.check([
      async () => this.http.pingCheck('Basic Check', `http://localhost:${this.configService.get<number>('PORT') || 3333}/api`),
      async () => this.prismaIndicator.isHealthy('Db'),
      () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
    ])
  }
}
