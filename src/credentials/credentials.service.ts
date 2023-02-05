import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { Verifiable, W3CCredential } from 'did-jwt-vc';
import { DIDDocument } from 'did-resolver';
import { PrismaService } from 'src/prisma.service';
import { DeriveCredentialDTO } from './dto/derive-credential.dto';
import { GetCredentialsBySubjectOrIssuer } from './dto/getCredentialsBySubjectOrIssuer.dto';
import { IssueCredentialDTO } from './dto/issue-credential.dto';
import { RenderTemplateDTO } from './dto/renderTemplate.dto';
import { UpdateStatusDTO } from './dto/update-status.dto';
import { VerifyCredentialDTO } from './dto/verify-credential.dto';
import { RENDER_OUTPUT } from './enums/renderOutput.enum';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const QRCode = require('qrcode');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ION = require('@decentralized-identity/ion-tools');
@Injectable()
export class CredentialsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getCredentials() {
    try {
      const credentials = await this.prisma.vC.findMany();
      return credentials;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getCredentialById(id: string) {
    try {
      const credential = await this.prisma.vC.findUnique({
        where: { id: id },
      });
      return credential;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async verifyCredential(verifyRequest: VerifyCredentialDTO) {
    // resolve DID
    // const verificationMethod: VerificationMethod =
    //   credential.proof.verificationMethod;
    const verificationMethod = 'did:ulp:5d7682f4-3cca-40fb-9fa2-1f6ebef4803b';
    const dIDResponse: AxiosResponse = await this.httpService.axiosRef.get(
      `http://localhost:3332/did/resolve/${verificationMethod}`,
    );
    const did: DIDDocument = dIDResponse.data as DIDDocument;
    try {
      const verified = await ION.verifyJws({
        jws: verifyRequest.verifiableCredential.proof.proofValue,
        publicJwk: did.verificationMethod[0].publicKeyJwk,
      });
      console.debug(verified);
      return true;
    } catch (e) {
      return false;
    }
  }

  async issueCredential(issueRequest: IssueCredentialDTO) {
    try {
      const credInReq = issueRequest.credential;
      await this.prisma.vCV2.create({
        data: {
          type: credInReq.type,
          issuer: credInReq.issuer as string,
          issuanceDate: credInReq.issuanceDate,
          expirationDate: credInReq.expirationDate,
          subject: JSON.stringify(credInReq.credentialSubject),
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    return;
  }

  async updateCredential(updateRequest: UpdateStatusDTO) {
    // TODO
    return;
  }

  async deleteCredential(id: string) {
    try {
      const credential = await this.prisma.vC.update({
        where: { id: id },
        data: {
          status: 'REVOKED',
        },
      });
      return credential;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getCredentialsBySubjectOrIssuer(
    getCreds: GetCredentialsBySubjectOrIssuer,
  ) {
    try {
      const credentials = await this.prisma.vC.findMany({
        where: {
          subject: getCreds.subject,
          issuer: getCreds.issuer,
        },
      });
      return credentials;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async renderCredentials(renderingRequest: RenderTemplateDTO) {
    const output = renderingRequest.output;
    const credentail = renderingRequest.credentials;
    const schema = renderingRequest.schema;
    const template = renderingRequest.template;

    switch (output) {
      case RENDER_OUTPUT.QR:
        // const QRData = await this.renderAsQR(renderingRequest.credentials.credentialId);
        break;
      case RENDER_OUTPUT.STRING:
        break;
      case RENDER_OUTPUT.HTML:

        break;
      case RENDER_OUTPUT.QR_LINK:
        break;
      case RENDER_OUTPUT.STRING:
        break;
      case RENDER_OUTPUT.JSON:
        break;
    }
  }

  async deriveCredential(deriveRequest: DeriveCredentialDTO) {
    return;
  }

  // UTILITY FUNCTIONS
  async renderAsQR(credentialId: string): Promise<any> {
    const credential = await this.prisma.vC.findUnique({
      where: { id: credentialId },
    });

    try {
      const QRData = await QRCode.toDataURL(
        (credential.signed as Verifiable<W3CCredential>).proof.proofValue,
      );
      return QRData;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
