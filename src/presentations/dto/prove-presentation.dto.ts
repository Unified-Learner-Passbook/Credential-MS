import { IssuedVerifiableCredential } from 'src/credentials/schema/VC.schema';

export class ProvePresentationDTO {
  presentation: {
    '@context': string[];
    id: string;
    type: string[];
    holder: JSON; // TODO: Find its proper object type
    verifiableCredential: ReadonlyArray<IssuedVerifiableCredential>;
  };
  options: {
    type: string;
    verificationMethod: string;
    proofPurpose: string;
    created: string;
    challenge: string;
    domain: string;
  };
}
