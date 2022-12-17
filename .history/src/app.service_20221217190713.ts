import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VCRequest, VCUpdateRequest } from './app.interface';
import { AppUtils } from './app.utils';
import { PrismaService } from './prisma.service';
import jwt = require('jsonwebtoken');
import fs = require('fs');
import { join } from 'path';
import { Issuer } from 'did-jwt-vc';
import { EthrDID } from 'ethr-did';

@Injectable()
export class AppService {
  publicKeyUrl: "";
  issuer = new EthrDID({
    identifier: '0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198',
    privateKey: 'd8b595680851765f38ea5405129244ba3cbad84467d190859f4c8b20c1ff6c75'
  }) as Issuer
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
        vcId: req.sub,
        vc: req.toString(),
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

