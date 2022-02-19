import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { PredictionType } from '../BackEnd/Contracts/Prediction/Common/predictionType';
import { PredictionRequest } from '../BackEnd/Contracts/Prediction/Request/prediction-request';
import { BusinessException } from '../BackEnd/Core/Exceptions/business.exception';
import { PredictionService } from '../BackEnd/Services/Implementations/prediction.service';
import { IPredictionService } from '../BackEnd/Services/Interfaces/prediction.service.interface';
import { PreditcionRequestModel } from '../Models/Requests/prediction-request.model';
import { PreditcionTypeRequestModel } from '../Models/Requests/prediction-type-request.model';

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

  // @Post()
  // ddd(): void {
  //   throw new BusinessException('asd2222122222');
  // }

  @Post()
  @HttpCode(204)
  create(@Body() dto: PreditcionRequestModel): void {
    const request = new PredictionRequest(
      dto.event_id,
      dto.prediction,
      this.mapToPredictionType(dto.market_type),
    );

    this.predictionService.insert(request);
  }

  private mapToPredictionType(
    type: PreditcionTypeRequestModel,
  ): PredictionType {
    if (type === PreditcionTypeRequestModel.Score) {
      return PredictionType.Score;
    }

    if (type === PreditcionTypeRequestModel.Result) {
      return PredictionType.Result;
    }

    throw new BusinessException(
      `No contract translation for type ${PreditcionTypeRequestModel[type]}`,
    );
  }
}
