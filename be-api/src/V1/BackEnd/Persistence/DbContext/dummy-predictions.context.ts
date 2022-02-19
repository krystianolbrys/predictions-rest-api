import { PredictionDto } from '../DataTranferObjects/prediction-dto';
import { IDbContext } from './dbContext.interface';

export class DummyPredictionsContext implements IDbContext<PredictionDto> {
  insert(model: PredictionDto): void {
    throw new Error('Method not implemented.');
  }
  fetchAll(): PredictionDto[] {
    throw new Error('Method not implemented.');
  }
  fetchOne(id: number): PredictionDto {
    throw new Error('Method not implemented.');
  }
  updateStatus(id: number, updatedModel: PredictionDto): void {
    throw new Error('Method not implemented.');
  }
}
