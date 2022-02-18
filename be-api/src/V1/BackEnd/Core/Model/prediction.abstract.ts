import { PredictionType } from '../Enums/predictionType';
import { Status } from '../Enums/status';
import { BusinessException } from '../Exceptions/business.exception';
import { IPredictionStringValidator } from '../Validators/predictionStringValidator.interface';

export abstract class Prediction {
  abstract readonly predictionType: PredictionType;

  private status: Status;
  private isSoftDeleted: boolean;

  readonly id: number;
  readonly eventId: number;
  readonly predictionString: string;
  readonly creationTime: Date;
  private modificationTime: Date;

  constructor(
    id: number,
    eventId: number,
    predictionString: string,
    stringValidator: IPredictionStringValidator,
    creationTime: Date,
    modificationTime: Date,
    isSoftDeleted: boolean,
    status: Status,
  ) {
    if (id < 0) {
      throw new BusinessException('Id can not be lower that 0');
    }

    if (eventId < 0) {
      throw new BusinessException('EventId can not be lower that 0');
    }

    if (stringValidator == null || undefined) {
      throw new BusinessException('No stringValidator provided');
    }

    if (!stringValidator.validate(predictionString)) {
      throw new BusinessException(
        'Prediction value validation fail - please correct',
      );
    }

    this.id = id;
    this.status = status;
    this.eventId = eventId;
    this.predictionString = predictionString;
    this.creationTime = creationTime;
    this.modificationTime = modificationTime;
    this.isSoftDeleted = isSoftDeleted;
  }

  updateStatus(status: Status, updateDate: Date) {
    if (this.isDeleted()) {
      throw new BusinessException(
        `Game marked as deleted, can not perform operation`,
      );
    }

    if (this.status != Status.Unresolved) {
      throw new BusinessException(
        `Ateemp to change final status from ${Status[this.status]} to ${
          Status[status]
        }`,
      );
    }

    this.status = status;
    this.updateModificationTime(updateDate);
  }

  getUpdatedAt(): Date {
    return this.modificationTime;
  }

  markAsDeleted() {
    this.isSoftDeleted = true;
  }

  isDeleted(): boolean {
    return this.isSoftDeleted;
  }

  private updateModificationTime(furtherDate: Date) {
    if (furtherDate < this.creationTime) {
      throw new BusinessException(
        `ModificationDate can not be lower that CreationDate`,
      );
    }

    this.modificationTime = furtherDate;
  }
}
