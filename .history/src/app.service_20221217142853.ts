import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VCRequest } from './app.interface';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ){}

  register(req: VCRequest): any {
    throw new Error('Method not implemented.');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
