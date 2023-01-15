import { IssuedVerifiableCredential } from 'src/credentials/schema/VC.schema';

export class IssuedVerifiablePresentation {
  '@context': Array<string>;
  id: string;
  type: Array<string>;
  holder: any; // TODO: FIND PROPER OBJECT TYPE
  verifiableCredential: Array<IssuedVerifiableCredential>;
  proof: {
    type: string;
    created: string;
    challenge: string;
    domain: string;
    nonce: string;
    verificationMethod: string;
    proofPurpose: string;
    jws: string;
    proofValue: string;
  };
}
