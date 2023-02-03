import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddTemplateDTO } from './dto/addTemplate.dto';

@Injectable()
export class RenderingTemplatesService {
  constructor(private prisma: PrismaService) {}

  async getTemplateBySchemaID(schemaID: string) {
    try {
      return await this.prisma.template.findMany({
        where: { schema: schemaID },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getTemplateById(id: string) {
    try {
      return await this.prisma.template.findUnique({
        where: { id: id },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async addTemplate(addTemplateDto: AddTemplateDTO) {
    try {
      return await this.prisma.template.create({
        data: {
          schema: addTemplateDto.schema,
          template: addTemplateDto.template,
          type: addTemplateDto.type,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async updateTemplate(id: string, updateTemplateDto: AddTemplateDTO) {
    try {
      return await this.prisma.template.update({
        where: { id: id },
        data: {
          schema: updateTemplateDto.schema,
          template: updateTemplateDto.template,
          type: updateTemplateDto.type,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
