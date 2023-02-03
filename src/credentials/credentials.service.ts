import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DeriveCredentialDTO } from './dto/derive-credential.dto';
import { IssueCredentialDTO } from './dto/issue-credential.dto';
import { UpdateStatusDTO } from './dto/update-status.dto';
import { VerifyCredentialDTO } from './dto/verify-credential.dto';

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
    /*const verificationMethod = 'did:ulp:5d7682f4-3cca-40fb-9fa2-1f6ebef4803b';
    const dIDResponse: AxiosResponse = await this.httpService.axiosRef.get(
      `http://localhost:3332/did/resolve/${verificationMethod}`,
    );
    const did: DIDDocument = dIDResponse.data as DIDDocument;
    try {
      const verified = await ION.verifyJws({
        jws: credential.proof.proofValue,
        publicJwk: did.verificationMethod[0].publicKeyJwk,
      });
      console.debug(verified);
      return true;
    } catch (e) {
      return false;
    }*/
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

  async deriveCredential(deriveRequest: DeriveCredentialDTO) {
    return;
  }
}
