import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { PredictionService } from '../BackEnd/Services/Implementations/prediction.service';
import { IPredictionService } from '../BackEnd/Services/Interfaces/prediction.service.interface';
import { PreditcionRequestModel } from '../Models/Requests/prediction-request.model';

@Controller({
  version: '1',
  path: 'predictions',
})
export class PredictionsController {
  constructor(
    @Inject(PredictionService)
    private readonly predictionService: IPredictionService,
  ) {}

  @Get()
  @HttpCode(200)
  fetchAll(): void {}

  @Post()
  @HttpCode(204)
  create(@Body() dto: PreditcionRequestModel): void {}
}
