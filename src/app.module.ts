import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RtcController } from './controllers/rtc/rtc.controller';
import { RtcService } from './services/rtc/rtc.service';

@Module({
  imports: [],
  controllers: [AppController, RtcController],
  providers: [AppService, RtcService],
})
export class AppModule {}
