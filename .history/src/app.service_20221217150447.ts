import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VCRequest } from './app.interface';
import { AppUtils } from './app.utils';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private utils: AppUtils
  ){}

  register(req: VCRequest): any {
    const proof = this.generateProof(req);
    const payload = this.utils.vcPayload(req, proof);
    this.prisma.VC.create({
      data: {
        vcId: req.credential.id,
        vc: payload
      }
    })
    return payload;
  }

  getVCs(): Promise<any> {
    return this.prisma.VC.findMany();
  }

  generateProof(req) {
    throw new Error('Function not implemented.');
  }
}

