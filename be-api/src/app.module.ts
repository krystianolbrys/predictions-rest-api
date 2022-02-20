import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TimeProvider } from './V1/BackEnd/Infrastructure/TimeProvider/time-provider';
import { DummyPredictionsContext } from './V1/BackEnd/Persistence/DbContext/dummy-predictions.context';
import DummyConsoleLogger from './V1/BackEnd/Services/Implementations/logger';
import { PredictionService } from './V1/BackEnd/Services/Implementations/prediction.service';
import { StringValidatorProvider } from './V1/BackEnd/Services/Providers/string-validator-provider';
import { PredictionsController } from './V1/Gateway/Controllers/predictions.controller';
import { GatewayMapper } from './V1/Gateway/Mappers/gateway-mapper';

@Module({
  imports: [],
  controllers: [AppController, PredictionsController],
  providers: [
    PredictionService,
    TimeProvider,
    DummyConsoleLogger,
    Logger,
    DummyPredictionsContext,
    StringValidatorProvider,
    GatewayMapper,
  ],
})
export class AppModule {}
