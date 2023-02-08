export class IssueCredentialDTO {
  credential: {
    '@context': string[];
    id: string;
    type: string[];
    issuer: string | { id: string };
    issuanceDate: string;
    expirationDate: string;
    credentialSubject: JSON;
    proof?: { [k: string]: unknown };
    options: {
      created: string; // The date and time of the proof (with a maximum accuracy in seconds). Default current system time.
      challenge: string; // A challenge provided by the requesting party of the proof. For example 6e62f66e-67de-11eb-b490-ef3eeefa55f2
      domain: string; //The intended domain of validity for the proof. For example website.example
      credentialStatus: {
        type: string;
      };
    };
  };
  credentialSchema: {
    type: string;
    version: string;
    id: string;
    name: string;
    author: string;
    authored: string;
    schema: {
      $id: string;
      $schema: string;
      description: string;
      name?: string;
      type: string;
      properties: {
        [k: string]: unknown;
      };
      required: [] | [string];
      additionalProperties: boolean;
      [k: string]: unknown;
    };
    proof?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
}
