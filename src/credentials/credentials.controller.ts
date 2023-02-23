import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream, unlinkSync } from 'fs';
import { CredentialsService } from './credentials.service';
import { DeriveCredentialDTO } from './dto/derive-credential.dto';
import { GetCredentialsBySubjectOrIssuer } from './dto/getCredentialsBySubjectOrIssuer.dto';
import { IssueCredentialDTO } from './dto/issue-credential.dto';
import { RenderTemplateDTO } from './dto/renderTemplate.dto';
import { UpdateStatusDTO } from './dto/update-status.dto';
import { VerifyCredentialDTO } from './dto/verify-credential.dto';
import { join } from 'path';
import type { Response } from 'express';

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
  getCredentialById(@Param() id: { id: string }) {
    console.log('id in getByIdController: ', id);
    return this.credentialsService.getCredentialById(id?.id);
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
  @Header('Content-Type', 'application/pdf')
  renderTemplate(
    @Body() renderRequest: RenderTemplateDTO,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const fanme = this.credentialsService.renderCredential(renderRequest);
    console.log('fanme: ', fanme);
    const file = createReadStream(join(process.cwd(), fanme));
    const response = new StreamableFile(file);
    // unlinkSync(join(process.cwd(), fanme));
    return response;
  }
}
