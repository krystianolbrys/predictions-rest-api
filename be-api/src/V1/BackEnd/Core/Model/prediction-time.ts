import { BusinessException } from '../Exceptions/business.exception';

export class PredictionTime {
  private modificationTime: Date;
  readonly creationTime: Date;

  constructor(creationTime: Date, modificationTime: Date) {
    if (modificationTime < creationTime) {
      throw new BusinessException(
        `ModificationDate can not be lower that CreationDate`,
      );
    }

    this.creationTime = creationTime;
    this.modificationTime = modificationTime;
  }

  getUpdatedAt(): Date {
    return this.modificationTime;
  }

  public updateModificationTime(furtherDate: Date) {
    if (furtherDate < this.modificationTime) {
      throw new BusinessException(
        `ModificationDate can not be lower that actual ModificationDate`,
      );
    }

    if (furtherDate < this.creationTime) {
      throw new BusinessException(
        `ModificationDate can not be lower that CreationDate`,
      );
    }

    this.modificationTime = furtherDate;
  }
}
