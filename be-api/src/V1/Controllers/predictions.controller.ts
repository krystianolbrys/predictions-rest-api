import { Controller, Get, Inject } from '@nestjs/common';
import { Prediction } from '../BackEnd/Core/Model/prediction.abstract';
import { PredictionService } from '../BackEnd/Services/Implementations/prediction.service';
import { IPredictionService } from '../BackEnd/Services/Interfaces/prediction.service.interface';

@Controller({
  version: '1',
  path: 'predictions',
})
export class PredictionsController {
  constructor(
    @Inject(PredictionService)
    private readonly predictionService: IPredictionService,
  ) {}

  // for now contract from BE for testing purposes without units
  @Get()
  getOk(): Prediction {
    return this.predictionService.getPrediction();
  }
}
