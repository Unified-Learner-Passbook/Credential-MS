import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { PrismaHealthIndicator } from 'prisma/prisma.health';
import { VCRequest, VCResponse } from './app.interface';
import { AppService } from './app.service';

@Controller('credentials')
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
  @ApiResponse({ type: VCRequest, status: 201, description: 'Create a new VC' })
  @ApiBody({ type: VCResponse })
  @Post('issue')
  @HttpCode(201)
  register(req: VCRequest): any {
    return this.appService.register(req);
  }

  @ApiOperation({ summary: 'Get VCs' })
  @ApiResponse({ type: VCResponse, status: 200, description: 'Get CA details' })
  @Get('/:caId')
  getCA(@Param('caId') caId: string): Promise<any> {
    // TODO: can implement ttl check here
    const ca = this.appService.getCA(caId);
    if(ca != null) { 
      const count = this.appService.getQueryCountByKey(ca['caId']);
      ca['query_count'] = count;
      return ca;
    }
    else {
      throw new HttpException("Error: No Consent Artifact Found", HttpStatus.BAD_REQUEST);
    }
  }
}
