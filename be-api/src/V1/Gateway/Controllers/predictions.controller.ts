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
import { PredictionRequest } from 'src/V1/BackEnd/Contracts/Prediction/Request/prediction-request';
import { PredictionService } from 'src/V1/BackEnd/Services/Implementations/prediction.service';
import { IPredictionService } from 'src/V1/BackEnd/Services/Interfaces/prediction.service.interface';
import { PredictionRequestModel } from '../Models/Requests/prediction-request.model';
import { PreditcionResponseModel } from '../Models/Response/prediction-response.model';
import { GatewayMapper } from '../Mappers/gateway-mapper';
import { Status } from '../Models/Shared/status';

@Controller({
  version: '1',
  path: 'predictions',
})
export class PredictionsController {
  constructor(
    @Inject(PredictionService)
    private readonly predictionService: IPredictionService,
    private readonly mapper: GatewayMapper,
  ) {}

  @Get()
  @HttpCode(200)
  fetchAll(): Array<PreditcionResponseModel> {
    return this.predictionService
      .fetchAll()
      .map(
        (responseModel) =>
          new PreditcionResponseModel(
            responseModel.id,
            responseModel.eventId,
            responseModel.predictionString,
            this.mapper.mapTypeFromContractToModel(
              responseModel.predictionType,
            ),
            this.mapper.mapStatusFromContractToModel(responseModel.status),
          ),
      );
  }

  @Post()
  @HttpCode(204)
  create(@Body() dto: PredictionRequestModel): void {
    const request = new PredictionRequest(
      dto.event_id,
      dto.prediction,
      this.mapper.mapTypeFromModelToContract(dto.market_type),
    );

    this.predictionService.insert(request);
  }

  @Put(':id/:status')
  @HttpCode(204)
  @ApiQuery({ name: 'status', enum: Status })
  update(@Query('id') id: number, @Query('status') status: Status) {
    this.predictionService.updateStatus(
      id,
      this.mapper.mapStatusFromModelToContract(status),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number) {
    this.predictionService.delete(id);
  }
}
