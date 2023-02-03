import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { DeriveCredentialDTO } from './dto/derive-credential.dto';
import { GetCredentialsBySubjectOrIssuer } from './dto/getCredentialsBySubjectOrIssuer.dto';
import { IssueCredentialDTO } from './dto/issue-credential.dto';
import { UpdateStatusDTO } from './dto/update-status.dto';
import { VerifyCredentialDTO } from './dto/verify-credential.dto';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Get()
  getCredentials() {
    return this.credentialsService.getCredentials();
  }

  @Post()
  getCredentialsBySubject(@Body() getCreds: GetCredentialsBySubjectOrIssuer) {
    return this.credentialsService.getCredentialsBySubjectOrIssuer(getCreds);
  }

  @Get(':id')
  getCredentialById(@Param() id: string) {
    return this.credentialsService.getCredentialById(id);
  }

  @Post('issue')
  issueCredentials(@Body() issueRequest: IssueCredentialDTO) {
    return this.credentialsService.issueCredential(issueRequest);
  }

  @Post('status')
  updateCredential(@Body() updateRequest: UpdateStatusDTO) {
    return this.credentialsService.updateCredential(updateRequest);
  }

  @Delete(':id')
  delteCredential(@Param() id: string) {
    return this.credentialsService.deleteCredential(id);
  }

  @Post('verify')
  verifyCredential(@Body() verifyRequest: VerifyCredentialDTO) {
    return this.credentialsService.verifyCredential(verifyRequest);
  }

  @Post('derive')
  deriveCredential(@Body() deriveRequest: DeriveCredentialDTO) {
    return this.credentialsService.deriveCredential(deriveRequest);
  }

  @Post('render')
  renderTemplate() {
    return;
  }
}
