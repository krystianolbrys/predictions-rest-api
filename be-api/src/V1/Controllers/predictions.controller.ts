import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PredictionType } from '../BackEnd/Contracts/Prediction/Common/predictionType';
import { PredictionRequest } from '../BackEnd/Contracts/Prediction/Request/prediction-request';
import { PredictionResponse } from '../BackEnd/Contracts/Prediction/Response/prediction-response';
import { BusinessException } from '../BackEnd/Core/Exceptions/business.exception';
import { PredictionService } from '../BackEnd/Services/Implementations/prediction.service';
import { IPredictionService } from '../BackEnd/Services/Interfaces/prediction.service.interface';
import { PredictionRequestModel } from '../Models/Requests/prediction-request.model';
import { PredictionStatusRequestModel } from '../Models/Requests/prediction-status-request.model';
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
  fetchAll(): Array<PredictionResponse> {
    return this.predictionService.fetchAll();
  }

  @Post()
  @HttpCode(204)
  create(@Body() dto: PredictionRequestModel): void {
    const request = new PredictionRequest(
      dto.event_id,
      dto.prediction,
      this.mapToPredictionType(dto.market_type),
    );

    this.predictionService.insert(request);
  }

  @Put(':id/:status')
  @HttpCode(200)
  @ApiQuery({ name: 'status', enum: PredictionStatusRequestModel })
  update(
    @Query('id') id: number,
    @Query('status') status: PredictionStatusRequestModel,
  ): PredictionStatusRequestModel {
    return status;
  }

  // @Put()
  // @HttpCode(204)
  // update(id: number, status: PredictionStatusRequestModel) {}

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number) {
    this.predictionService.delete(id);
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
