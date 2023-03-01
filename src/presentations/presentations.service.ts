import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PresentationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPresentations() {
    try {
      return await this.prisma.presentations.findMany();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getPresentationById(id: string) {
    try {
      return await this.prisma.presentations.findUnique({
        where: {
          id: id,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async deletePresentation(id: string) {
    try {
      return await this.prisma.presentations.update({
        where: {
          id: id,
        },
        data: {
          status: 'REVOKED',
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async provePresentation() {
    // TODO: implement
    return;
  }
}
