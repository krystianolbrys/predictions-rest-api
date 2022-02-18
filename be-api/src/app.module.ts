import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredictionService } from './V1/BackEnd/Services/Implementations/prediction.service';
import { PredictionsController } from './V1/Controllers/predictions.controller';

@Module({
  imports: [],
  controllers: [AppController, PredictionsController],
  providers: [AppService, PredictionService],
})
export class AppModule { }
