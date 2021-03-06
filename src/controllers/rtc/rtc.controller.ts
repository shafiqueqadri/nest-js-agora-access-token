import { Controller, UseGuards, Get, Request, Query } from '@nestjs/common';
import { CreateTokenDTO } from 'src/dto/rtc';
import { RtcService } from 'src/services/rtc/rtc.service';

@Controller('rtc')
export class RtcController {
  constructor(private readonly _rtc: RtcService) {}

  @Get('/generate-token')
  async getToken(@Request() req, @Query() query: CreateTokenDTO) {
    
    const token = await this._rtc.generateRtcToken(query);
    
    return token;
  }
}
