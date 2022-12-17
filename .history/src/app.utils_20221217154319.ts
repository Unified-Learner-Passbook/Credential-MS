import { request } from "http";

export class AppUtils{
    vcPayload(req, proof): any {
        const vc = {
            "@context": req.credential["@context"],
            "id": req.credential['id'],
            "type": req.credential['type'],
            "issuer": req.credential['issuer'],
            "issuanceDate": req.credential['issuanceDate'],
            "expirationDate": req.credential['expirationDate'],
            "credentialSubject": req.credential['credentialSubject'],
            "credentialStatus": req.options['credentialStatus'],
            "proof": proof
        }
    }

    proofPayload(jws, req, type, purpose, publicKeyUrl): any {
        const payload = {
            "type": type,
            "created": req.options['created'],
            "challenge": req.options['challenge'],
            "domain": req.options['domain'],
            "proofPurpose": purpose,
            "verificationMethod": publicKeyUrl,
            "jws": jws
          }
    }
}