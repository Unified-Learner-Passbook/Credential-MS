import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PresentationsService } from './presentations.service';

@Controller('presentations')
export class PresentationsController {
  constructor(private readonly presentationService: PresentationsService) {}

  @Get()
  getPresentations() {
    return this.presentationService.getPresentations();
  }

  @Get(':id')
  getPresentationById(@Param() id: string) {
    return this.presentationService.getPresentationById(id);
  }

  @Post('prove')
  createPresentation() {
    // TODO
    return;
  }

  @Delete(':id')
  deletePresentations(@Param() id: string) {
    return this.presentationService.deletePresentation(id);
  }
}
