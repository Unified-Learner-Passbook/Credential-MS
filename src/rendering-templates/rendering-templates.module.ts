import { Module } from '@nestjs/common';
import { RenderingTemplatesService } from './rendering-templates.service';
import { RenderingTemplatesController } from './rendering-templates.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [RenderingTemplatesService, PrismaService],
  controllers: [RenderingTemplatesController],
})
export class RenderingTemplatesModule {}
