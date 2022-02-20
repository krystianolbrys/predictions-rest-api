import { PredictionType } from '../../Shared/Enums/predictionType';
import { Status } from '../../Shared/Enums/status';
import { BusinessException } from '../Exceptions/business.exception';
import { ILogger } from '../Ports/logger.interface';
import { IPredictionStringValidator } from '../Validators/predictionStringValidator.interface';
import { PredictionTime } from './prediction-time';

export class Prediction {
  readonly predictionType: PredictionType;

  readonly logger: ILogger;

  private status: Status;
  private isSoftDeleted: boolean;
  readonly id: number;
  readonly eventId: number;
  readonly predictionString: string;
  readonly time: PredictionTime;

  constructor(
    id: number,
    eventId: number,
    predictionType: PredictionType,
    predictionString: string,
    stringValidator: IPredictionStringValidator,
    time: PredictionTime,
    isSoftDeleted: boolean,
    status: Status,
    logger: ILogger,
  ) {
    if (id < 0) {
      throw new BusinessException('Id can not be lower that 0');
    }

    if (eventId < 0) {
      throw new BusinessException('EventId can not be lower that 0');
    }

    if (logger == null || undefined) {
      throw new BusinessException('No stringValidator provided');
    }

    if (stringValidator == null || undefined) {
      throw new BusinessException('No stringValidator provided');
    }

    if (time == null || undefined) {
      throw new BusinessException('No predictionTime provided');
    }

    if (!stringValidator.validate(predictionString)) {
      throw new BusinessException(
        'Prediction value validation fail - please correct',
      );
    }

    this.id = id;
    this.status = status;
    this.eventId = eventId;
    this.predictionType = predictionType;
    this.predictionString = predictionString;
    this.isSoftDeleted = isSoftDeleted;
    this.time = time;

    this.logger = logger;
  }

  updateStatus(status: Status, updateDate: Date) {
    if (this.isDeleted()) {
      throw new BusinessException(
        `Game marked as deleted, can not perform operation`,
      );
    }

    if (this.status !== Status.Unresolved) {
      const message = `Attemp to change final status from ${this.status.toString()} to ${status.toString()}`;

      this.logger.log(message);
      throw new BusinessException(message);
    }

    this.status = status;
    this.time.updateModificationTime(updateDate);
  }

  getStatus(): Status {
    return this.status;
  }

  markAsDeleted() {
    this.isSoftDeleted = true;
  }

  isDeleted(): boolean {
    return this.isSoftDeleted;
  }
}
