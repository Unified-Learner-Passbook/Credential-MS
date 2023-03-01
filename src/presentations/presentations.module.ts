import { Module } from '@nestjs/common';
import { PresentationsService } from './presentations.service';
import { PresentationsController } from './presentations.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PresentationsService, PrismaService],
  controllers: [PresentationsController],
})
export class PresentationsModule {}
