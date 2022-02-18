import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredictionsController } from './V1/Controllers/predictions.controller';

@Module({
  imports: [],
  controllers: [AppController, PredictionsController],
  providers: [AppService],
})
export class AppModule {}
