import { Module } from '@nestjs/common';
import { ExchangesService } from './exchanges.service';
import { ExchangesController } from './exchanges.controller';

@Module({
  providers: [ExchangesService],
  controllers: [ExchangesController]
})
export class ExchangesModule {}
