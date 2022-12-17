import { Controller, Get, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { PrismaHealthIndicator } from 'prisma/prisma.health';
import { VCRequest, VCResponse } from './app.interface';
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

  @ApiOperation({ summary: 'Register VC' })
  @ApiResponse({ type: VCRequest, status: 200, description: 'Create a new VC' })
  @ApiBody({ type: VCResponse })
  @Post('/register')
  register(req: VCRequest): any {
    return this.appService.register(req);
  }
}
