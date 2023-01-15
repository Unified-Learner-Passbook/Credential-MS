import { Controller, Param, Post } from '@nestjs/common';

@Controller('exchanges')
export class ExchangesController {
  @Post()
  postExchange() {
    return;
  }

  @Post(':exchangeId')
  initiateExchange(@Param() exchangeId: string) {
    return;
  }

  @Post(':exchangeId/:transactionId')
  recieveInfoForExchange(
    @Param() exchangeId: string,
    @Param() transactionId: string,
  ) {
    return;
  }
}
