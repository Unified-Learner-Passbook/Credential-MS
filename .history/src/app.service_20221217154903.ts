import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VCRequest, VCUpdateRequest } from './app.interface';
import { AppUtils } from './app.utils';
import { PrismaService } from './prisma.service';
import jwt = require('jsonwebtoken');
import fs = require('fs');
import { join } from 'path';

@Injectable()
export class AppService {
  publicKeyUrl: "";
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private utils: AppUtils
  ){}

  register(req: VCRequest): any {
    const payload = this.utils.vcPayload(req);
    const proof = this.generateProof(req, payload, "assertionMethod");
    payload['proof'] = proof;
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
    this.prisma.vC.update({
      where: {
        vcId: req.credentialId,
      },
      data: vc
    })
    return "Credential status successfully updated	"
  }

  generateProof(req, payload, purpose) {
    var privateKey = fs.readFileSync(join(process.cwd(), 'scripts', 'jwtRS256.key'));
    var token = jwt.sign(payload, privateKey, { algorithm: 'RS256'});
    return this.utils.proofPayload(token, req, "RSA256", purpose, this.publicKeyUrl)
  }
}

