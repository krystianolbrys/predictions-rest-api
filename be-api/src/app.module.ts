import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TimeProvider } from './V1/BackEnd/Infrastructure/TimeProvider/time-provider';
import DummyConsoleLogger from './V1/BackEnd/Services/Implementations/logger';
import { PredictionService } from './V1/BackEnd/Services/Implementations/prediction.service';
import { PredictionsController } from './V1/Controllers/predictions.controller';

@Module({
  imports: [],
  controllers: [AppController, PredictionsController],
  providers: [PredictionService, TimeProvider, DummyConsoleLogger, Logger],
})
export class AppModule {}
