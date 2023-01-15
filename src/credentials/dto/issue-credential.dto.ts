export class IssueCredentialDTO {
  credential: {
    '@context': string[];
    id: string;
    type: string[];
    issuer: string | { id: string };
    issuanceDate: string;
    expirationDate: string;
    credentialSubject: JSON;
  };
  options: {
    created: string; // The date and time of the proof (with a maximum accuracy in seconds). Default current system time.
    challenge: string; // A challenge provided by the requesting party of the proof. For example 6e62f66e-67de-11eb-b490-ef3eeefa55f2
    domain: string; //The intended domain of validity for the proof. For example website.example
    credentialStatus: {
      type: string;
    };
  };
}
