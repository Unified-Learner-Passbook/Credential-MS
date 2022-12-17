export interface VCRequest {
    credential: credential;
    options: credentialOptions;
}

export interface credential {
    "@context": Array<any>;
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