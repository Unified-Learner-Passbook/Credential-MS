import { Controller, Get, HttpCode, Param, Post, Headers } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiskHealthIndicator, HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { PrismaHealthIndicator } from 'prisma/prisma.health';
import { VCRequest, VCResponse, VCUpdateRequest } from './app.interface';
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
  register(req: VCRequest, @Headers('X-AUTHORIZATION') token: string): any {
    return this.appService.register(req, token);
  }

  @ApiOperation({ summary: 'Get All VCs' })
  @ApiResponse({ type: VCResponse, status: 200, description: 'Get list of all VCs' })
  @Get()
  getVCs(): Promise<any> {
    return this.appService.getVCs();
  }

  @ApiOperation({ summary: 'Get VC by Subject' })
  @ApiResponse({ type: VCResponse, status: 200, description: 'Get VC details by Subject' })
  @Get('/:sub')
  @HttpCode(200)
  getVCBySub(@Param('sub') sub: string): Promise<any> {
    return this.appService.getVCBySub(sub);
  }

  @ApiOperation({ summary: 'Get VC by Issuer' })
  @ApiResponse({ type: VCResponse, status: 200, description: 'Get VC details by Issuer' })
  @Get('/:iss')
  @HttpCode(200)
  getVCByIss(@Param('iss') iss: string): Promise<any> {
    return this.appService.getVCByIss(iss);
  }

  @ApiOperation({ summary: 'Update VC Status' })
  @ApiResponse({ type: String, status: 200, description: 'Update VC' })
  @ApiBody({ type: VCUpdateRequest })
  @Post('status')
  @HttpCode(200)
  update(req: VCUpdateRequest, @Headers('X-AUTHORIZATION') token: string): any {
    return this.appService.updateStatus(req, token);
  }

  @ApiOperation({ summary: 'Verify Credential' })
  @ApiResponse({ type: String, status: 200, description: 'Update VC' })
  @ApiBody({ type: VCUpdateRequest })
  @Post('verify')
  @HttpCode(200)
  verify(req: VCRequest): any {
    return this.appService.verify(req);
  }
}
