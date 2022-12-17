import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VCRequest, VCUpdateRequest } from './app.interface';
import { PrismaService } from './prisma.service';
import jwt = require('jsonwebtoken');
import fs = require('fs');
import { join } from 'path';
import { createVerifiableCredentialJwt, Issuer, verifyCredential } from 'did-jwt-vc';
import { EthrDID } from 'ethr-did';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';

@Injectable()
export class AppService {
  publicKeyUrl: "";
  issuer = new EthrDID({
    identifier: '0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198',
    privateKey: 'd8b595680851765f38ea5405129244ba3cbad84467d190859f4c8b20c1ff6c75'
  }) as Issuer
  providerConfig = {
    rpcUrl: 'https://mainnet.infura.io/v3/<YOUR infura.io PROJECT ID>',
    registry: '0xdca7ef03e98e0dc2b855be647c39abe984fcf21b'
  }
  resolver = new Resolver(getResolver(this.providerConfig))
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ){}

  async register(req: VCRequest, token): Promise<any> {
    // const vcJwt = await createVerifiableCredentialJwt(req, this.issuer);
    const vcJwt = "Response from MS: Signed String"
    req.vc.proof = vcJwt;
    this.prisma.vC.create({
      data: {
        vcId: req.sub,
        vc: JSON.stringify(req),
      }
    })
    return vcJwt;
  }

  getVCs(): Promise<any> {
    return this.prisma.vC.findMany({
      select: {
        vc: true
      }
    });
  }

  getVCBySub(sub: string) {
    return this.prisma.vC.findMany({
      where: {
        sub: sub,
      },
      select: {
        vc: true,
      }
    })
  }

  getVCByIss(iss: string) {
    return this.prisma.vC.findMany({
      where: {
        iss: iss,
      },
      select: {
        vc: true,
      }
    })
  }

  updateStatus(req: VCUpdateRequest, token: string): any {
    let vc = this.getVCBySub(req.sub)
    vc['vc']['credentialStatus'] = req.crdentialStatus;
    //TODO: get signed proof from MS from token
    const proof = "Response: Signed String"
    vc['vc']['proof'] = proof;
    this.prisma.vC.update({
      where: {
        sub_iss: {
          sub: req.sub,
          iss: req.iss,
        }
      },
      data: vc
    })
    return "Credential status successfully updated"
  }
  
  async verify(req: VCRequest): Promise<any> {
    const verifiedVC = await verifyCredential(req.vc.proof.jws, this.resolver)
    return verifiedVC;
  }
}

