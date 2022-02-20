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
import { PredictionRequest } from '../BackEnd/Contracts/Prediction/Request/prediction-request';
import { PredictionService } from '../BackEnd/Services/Implementations/prediction.service';
import { IPredictionService } from '../BackEnd/Services/Interfaces/prediction.service.interface';
import { Status } from '../BackEnd/Shared/Enums/status';
import { PredictionRequestModel } from '../Models/Requests/prediction-request.model';
import { PreditcionResponseModel } from '../Models/Response/prediction-response.model';

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
  fetchAll(): Array<PreditcionResponseModel> {
    return this.predictionService
      .fetchAll()
      .map(
        (model) =>
          new PreditcionResponseModel(
            model.id,
            model.eventId,
            model.predictionString,
            model.predictionType,
            model.status,
          ),
      );
  }

  @Post()
  @HttpCode(204)
  create(@Body() dto: PredictionRequestModel): void {
    const request = new PredictionRequest(
      dto.event_id,
      dto.prediction,
      dto.market_type,
    );

    this.predictionService.insert(request);
  }

  @Put(':id/:status')
  @HttpCode(200)
  @ApiQuery({ name: 'status', enum: Status })
  update(@Query('id') id: number, @Query('status') status: Status) {
    this.predictionService.updateStatus(id, status);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number) {
    this.predictionService.delete(id);
  }
}
