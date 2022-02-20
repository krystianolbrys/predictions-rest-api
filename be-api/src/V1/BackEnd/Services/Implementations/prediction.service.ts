import { Inject } from '@nestjs/common';
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
import { PredictionRequest } from '../../Contracts/Prediction/Request/prediction-request';
import { PredictionType } from '../../Contracts/Prediction/Common/predictionType';
import { DummyPredictionsContext } from '../../Persistence/DbContext/dummy-predictions.context';
import { IDbContext } from '../../Persistence/DbContext/dbContext.interface';
import { PredictionDto } from '../../Persistence/DataTranferObjects/prediction-dto';
import { PredictionResponse } from '../../Contracts/Prediction/Response/prediction-response';
import { ResultPredictionStringValidator } from '../../Core/Validators/resultPredictionStringValidator';
import { Status as StatusContract } from '../../Contracts/Prediction/Common/status';

@Injectable()
export class PredictionService implements IPredictionService {
  private readonly DefaultZeroIdentifierValue: number;

  constructor(
    @Inject(DummyPredictionsContext)
    private readonly dbContext: IDbContext<PredictionDto>,
    @Inject(TimeProvider) private readonly timeProvider: ITimeProvider,
    @Inject(DummyConsoleLogger) private readonly logger: ILogger,
  ) {
    this.DefaultZeroIdentifierValue = 0;
  }
  updateStatus(id: number, status: StatusContract): void {
    const dto = this.dbContext.fetchOne(id);

    const now = this.timeProvider.getNowUTC();
    const predictionTime = new PredictionTime(dto.creationDate, now);

    const scoreValidator = this.getStringValidatorBasedOnType(
      PredictionType[dto.predictionType.toString()],
    );

    const predictionCore = new ScorePrediction(
      dto.id,
      dto.eventId,
      dto.predictionValue,
      scoreValidator,
      predictionTime,
      dto.isSoftDeleted,
      this.logger,
      Status[dto.status],
    );

    predictionCore.updateStatus(
      this.mapStatusCOntractToCoreStatus(status),
      now,
    );

    dto.status = Status[predictionCore.getStatus()].toString();

    this.dbContext.update(id, dto);
  }

  delete(id: number): void {
    this.dbContext.delete(id);
  }

  fetchAll(): PredictionResponse[] {
    const all = this.dbContext.fetchAll();

    this.logger.log(all[0].status);

    const result = all.map(
      (dto) =>
        new PredictionResponse(
          dto.id,
          dto.eventId,
          dto.predictionValue,
          PredictionType[dto.predictionType],
          Status[dto.status],
        ),
    );

    return result;
  }

  insert(prediction: PredictionRequest): void {
    const now = this.timeProvider.getNowUTC();
    const notDeleted = false;
    const predictionTime = new PredictionTime(now, now);
    const scoreValidator = this.getStringValidatorBasedOnType(
      prediction.predictionType,
    );

    const scorePrediction: Prediction = new ScorePrediction(
      this.DefaultZeroIdentifierValue,
      prediction.eventId,
      prediction.predictionString,
      scoreValidator,
      predictionTime,
      notDeleted,
      this.logger,
    );

    const dto = new PredictionDto();
    dto.id = scorePrediction.id;
    dto.eventId = scorePrediction.eventId;
    dto.status = Status[scorePrediction.getStatus()];
    dto.predictionType = PredictionType[scorePrediction.predictionType];
    dto.predictionValue = scorePrediction.predictionString;
    dto.creationDate = now;
    dto.modificationDate = now;
    dto.isSoftDeleted = false;

    this.dbContext.insert(dto);
  }

  private getStringValidatorBasedOnType(
    type: PredictionType,
  ): IPredictionStringValidator {
    if (type === PredictionType.Score) {
      return new ScorePredictionStringValidator();
    }

    if (type === PredictionType.Result) {
      return new ResultPredictionStringValidator();
    }

    throw new BusinessException(
      `No PredictionStringValidator for given type ${PredictionType[type]}`,
    );
  }

  private mapStatusCOntractToCoreStatus(status: StatusContract): Status {
    if (status == StatusContract.Win) {
      return Status.Win;
    }

    if (status == StatusContract.Lost) {
      return Status.Lost;
    }

    if (status == StatusContract.Unresolved) {
      return Status.Unresolved;
    }

    if (status == StatusContract.Draw) {
      return Status.Draw;
    }
  }
}
