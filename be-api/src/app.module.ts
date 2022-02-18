import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PredictionService } from './V1/BackEnd/Services/Implementations/prediction.service';
import { PredictionsController } from './V1/Controllers/predictions.controller';

@Module({
  imports: [],
  controllers: [AppController, PredictionsController],
  providers: [PredictionService],
})
export class AppModule { }
