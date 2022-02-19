import { Inject, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Status } from '../../Core/Enums/status';
import { BusinessException } from '../../Core/Exceptions/business.exception';
import { ILogger } from '../../Core/Ports/logger.interface';
import { Prediction } from '../../Core/Model/prediction.abstract';
import { ScorePrediction } from '../../Core/Model/score-prediction';
import { IPredictionStringValidator } from '../../Core/Validators/predictionStringValidator.interface';
import { ScorePredictionStringValidator } from '../../Core/Validators/scorePredictionStringValidator';
import { TimeProvider } from '../../Infrastructure/TimeProvider/time-provider';
import { ITimeProvider } from '../../Infrastructure/TimeProvider/time-provider.interface';
import { IPredictionService } from '../Interfaces/prediction.service.interface';
import DummyConsoleLogger from './logger';
import { PredictionTime } from '../../Core/Model/prediction-time';

@Injectable()
export class PredictionService implements IPredictionService {
  constructor(
    @Inject(TimeProvider) private readonly timeProvider: ITimeProvider,
    @Inject(DummyConsoleLogger) private readonly logger: ILogger,
  ) {}

  getPrediction(): Prediction {
    const scoreValidator: IPredictionStringValidator =
      new ScorePredictionStringValidator();

    const now = this.timeProvider.getNowUTC();

    const predictionTime = new PredictionTime(now, now);

    const scorePrediction: Prediction = new ScorePrediction(
      1,
      2,
      '3:5',
      scoreValidator,
      predictionTime,
      false,
      this.logger,
    );

    scorePrediction.updateStatus(Status.Lost, now);
    //scorePrediction.updateStatus(Status.Win, now);

    return scorePrediction;
  }

  getBusinessError(): void {
    throw new BusinessException('getBusinessErrorExmaple');
  }

  getOkMessage(): string {
    return 'OkFromService';
  }
}
