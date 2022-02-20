import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { ILogger } from '../../Core/Ports/logger.interface';
import { TimeProvider } from '../../Infrastructure/TimeProvider/time-provider';
import { ITimeProvider } from '../../Infrastructure/TimeProvider/time-provider.interface';
import { IPredictionService } from '../Interfaces/prediction.service.interface';
import DummyConsoleLogger from './logger';
import { PredictionTime } from '../../Core/Model/prediction-time';
import { PredictionRequest } from '../../Contracts/Prediction/Request/prediction-request';
import { DummyPredictionsContext } from '../../Persistence/DbContext/dummy-predictions.context';
import { IDbContext } from '../../Persistence/DbContext/dbContext.interface';
import { PredictionDto } from '../../Persistence/DataTranferObjects/prediction-dto';
import { PredictionResponse } from '../../Contracts/Prediction/Response/prediction-response';
import { Status } from '../../Shared/Enums/status';
import { Prediction } from '../../Core/Model/prediction';
import { IStringValidatorProvider } from '../Interfaces/string-validator-provider.interface';
import { StringValidatorProvider } from '../Providers/string-validator-provider';
import { IPredictionStringValidator } from '../../Core/Validators/predictionStringValidator.interface';

@Injectable()
export class PredictionService implements IPredictionService {
  private readonly DefaultZeroIdentifierValue: number;

  constructor(
    @Inject(DummyPredictionsContext)
    private readonly dbContext: IDbContext<PredictionDto>,
    @Inject(StringValidatorProvider)
    private readonly validatorProvider: IStringValidatorProvider,
    @Inject(TimeProvider) private readonly timeProvider: ITimeProvider,
    @Inject(DummyConsoleLogger) private readonly logger: ILogger,
  ) {
    this.DefaultZeroIdentifierValue = 0;
  }
  updateStatus(id: number, status: Status): void {
    const dto = this.dbContext.fetchOne(id);

    const now = this.timeProvider.getNowUTC();
    const predictionTime = new PredictionTime(
      dto.creationDate,
      dto.modificationDate,
    );

    const stringValidator = this.validatorProvider.provide(dto.predictionType);

    const core = this.createCoreFromDto(dto, stringValidator, predictionTime);
    core.updateStatus(status, now);

    dto.status = core.getStatus();
    this.dbContext.update(id, dto);
  }

  delete(id: number): void {
    // shortCut - should be passed throught Core and delegated to Prediction.markAsDeleted()
    this.dbContext.delete(id);
  }

  fetchAll(): PredictionResponse[] {
    const all = this.dbContext.fetchAll();

    const result = all.map(
      (dto) =>
        new PredictionResponse(
          dto.id,
          dto.eventId,
          dto.predictionValue,
          dto.predictionType,
          dto.status,
        ),
    );

    return result;
  }

  insert(request: PredictionRequest): void {
    const now = this.timeProvider.getNowUTC();
    const notDeleted = false;
    const predictionTime = new PredictionTime(now, now);
    const scoreValidator = this.validatorProvider.provide(
      request.predictionType,
    );

    const core: Prediction = new Prediction(
      this.DefaultZeroIdentifierValue,
      request.eventId,
      request.predictionType,
      request.predictionString,
      scoreValidator,
      predictionTime,
      notDeleted,
      Status.Unresolved,
      this.logger,
    );

    const dto = this.createDtoFromCore(core, now);

    this.dbContext.insert(dto);
  }

  private createDtoFromCore(core: Prediction, now: Date) {
    const dto = new PredictionDto();
    dto.id = core.id;
    dto.eventId = core.eventId;
    dto.status = core.getStatus();
    dto.predictionType = core.predictionType;
    dto.predictionValue = core.predictionString;
    dto.creationDate = now;
    dto.modificationDate = now;
    dto.isSoftDeleted = false;
    return dto;
  }

  private createCoreFromDto(
    dto: PredictionDto,
    stringValidator: IPredictionStringValidator,
    predictionTime: PredictionTime,
  ) {
    return new Prediction(
      dto.id,
      dto.eventId,
      dto.predictionType,
      dto.predictionValue,
      stringValidator,
      predictionTime,
      dto.isSoftDeleted,
      dto.status,
      this.logger,
    );
  }
}
