import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AddTemplateDTO } from './dto/addTemplate.dto';
import { UpdateTemplateDTO } from './dto/updateTemplate.dto';
import { RenderingTemplatesService } from './rendering-templates.service';

@Controller('rendering-template')
export class RenderingTemplatesController {
  constructor(
    private readonly renderingTemplateService: RenderingTemplatesService,
  ) {}

  @Get(':schemaId')
  getTemplateBySchemaID(@Param('schemaId') schemaId: string) {
    return this.renderingTemplateService.getTemplateBySchemaID(schemaId);
  }

  @Get()
  getTemplateById(@Query('id') id: string) {
    return this.renderingTemplateService.getTemplateById(id);
  }

  @Post()
  addTemplate(@Body() addTemplateDto: AddTemplateDTO) {
    return this.renderingTemplateService.addTemplate(addTemplateDto);
  }

  @Put()
  updateTemplate(@Body() updateTemplateDto: UpdateTemplateDTO) {
    return this.renderingTemplateService.updateTemplate(
      updateTemplateDto.id,
      updateTemplateDto,
    );
  }
}
