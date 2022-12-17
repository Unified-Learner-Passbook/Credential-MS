import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VCRequest, VCUpdateRequest } from './app.interface';
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
    this.prisma.vC.create({
      data: {
        vcId: req.credential.id,
        vc: payload
      }
    })
    return payload;
  }

  getVCs(): Promise<any> {
    return this.prisma.vC.findMany({
      select: {
        vc: true
      }
    });
  }

  getVC(vcId: string) {
    return this.prisma.vC.findUnique({
      where: {
        vcId: vcId,
      },
      select: {
        vc: true,
      }
    })
    throw new Error('Method not implemented.');
  }

  updateStatus(req: VCUpdateRequest): any {
    let vc = this.getVC(req.credentialId)
    vc['credentialStatus'] = req.crdentialStatus;
    return this.prisma.vC.update({
      where: {
        vcId: req.credentialId,
      },
      data: vc
    })
    return "Credential status successfully updated	"
  }

  generateProof(req) {
    throw new Error('Function not implemented.');
  }
}

