export interface VCRequest {
    credential: credential;
    options: credentialOptions;
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

export interface VCResponse {
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