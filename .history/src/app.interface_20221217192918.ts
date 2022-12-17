export type Extensible<T> = T & { [x: string]: any }

export interface CredentialStatus {
    id: string
    type: string
  }

export type JwtCredentialSubject = Record<string, any>

export class VCRequest {
  iss?: string
  sub?: string
  vc: Extensible<{
    '@context': string[] | string
    type: string[] | string
    credentialSubject: JwtCredentialSubject
    credentialStatus?: CredentialStatus
    evidence?: any
    termsOfUse?: any
  }>
  nbf?: number
  aud?: string | string[]
  exp?: number
  jti?: string
}

export interface vc {
    "@context": Array<string>;
    type: Array<string>;
}
export interface credential {
    "@context": Array<string>;
    id: string;
    type: Array<string>;
    issuer: string;
    issueance_date: string;
    expiration_date: string;
    credentialSubject: any;
}

export interface credentialOptions {
    created: string;
    challenge: string;
    domain: string;
    credentialStatus: any;
}

export class VCResponse {
    "@context":        Array<string>;
    id:                string;
    type:              string[];
    issuer:            string;
    issuanceDate:      Date;
    credentialSubject: any;
    proof:             Proof;
}

export interface Proof {
    type:               string;
    created:            Date;
    proofPurpose:       string;
    verificationMethod: string;
    jws:                string;
}

export class VCUpdateRequest {
    credentialId: string;
    crdentialStatus: any;
}