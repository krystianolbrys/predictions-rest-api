import { Inject } from '@nestjs/common';
import { ILogger } from '../../Core/Ports/logger.interface';
import DummyConsoleLogger from '../../Services/Implementations/logger';
import { PredictionDto } from '../DataTranferObjects/prediction-dto';
import { PersistenceException } from '../Exceptions/persistence.exception';
import { IDbContext } from './dbContext.interface';

export class DummyPredictionsContext implements IDbContext<PredictionDto> {
  readonly collection: Array<PredictionDto>;

  constructor(@Inject(DummyConsoleLogger) private readonly logger: ILogger) {
    this.collection = [];
  }

  insert(model: PredictionDto): void {
    model.id = this.getNewId();
    this.collection.push(model);
  }

  fetchAll(): PredictionDto[] {
    return this.collection.filter((prediction) => !prediction.isSoftDeleted);
  }

  fetchOne(id: number): PredictionDto {
    const filteredElementsWithGivenId = this.fetchAll().filter(
      (prediction) => prediction.id == id,
    );

    this.logger.log(filteredElementsWithGivenId.length.toString());
    const isPresent = filteredElementsWithGivenId.length == 1;

    if (!isPresent) {
      throw new PersistenceException(`No Prediction with id ${id}`);
    }

    return filteredElementsWithGivenId[0];
  }

  // only status update for simplicity
  update(id: number, updatedModel: PredictionDto): void {
    const currentPrediction = this.fetchOne(id);
    currentPrediction.status = updatedModel.status;
  }

  delete(id: number): void {
    const currentPrediction = this.fetchOne(id);
    currentPrediction.isSoftDeleted = true;
  }

  private getNewId(): number {
    if (this.collection.length == 0) {
      return 1;
    }

    return this.collection.length + 1;
  }
}
