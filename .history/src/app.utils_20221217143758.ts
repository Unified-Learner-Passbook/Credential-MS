import { request } from "http";

export class AppUtils{
    vcPayload(req): any {
        const vc = {
            "@context": req.credential["@context"],
            "id": req.credential['id'],
            "type": req.credential['type'],
            "issuer": req.credential['issuer'],
            "issuanceDate": req.credential['issuanceDate'],
            "expirationDate": req.credential['expirationDate'],
            "credentialSubject": req.credential['credentialSubject']
        }
    }
}