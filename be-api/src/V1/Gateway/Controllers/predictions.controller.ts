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
import { PredictionType as PredictionTypeContract } from 'src/V1/BackEnd/Shared/Enums/predictionType';
import { PredictionType as PredictionTypeModel } from '../Models/Shared/predictionType';
import { Status as StatusContract } from 'src/V1/BackEnd/Shared/Enums/status';
import { Status as StatusModel } from '../Models/Shared/status';
import { PredictionRequestModel } from '../Models/Requests/prediction-request.model';
import { PreditcionResponseModel } from '../Models/Response/prediction-response.model';
import { BusinessException } from 'src/V1/BackEnd/Core/Exceptions/business.exception';

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
        (responseModel) =>
          new PreditcionResponseModel(
            responseModel.id,
            responseModel.eventId,
            responseModel.predictionString,
            this.mapTypeContractToModel(responseModel.predictionType),
            this.mapStatusContractToModel(responseModel.status),
          ),
      );
  }

  @Post()
  @HttpCode(204)
  create(@Body() dto: PredictionRequestModel): void {
    const request = new PredictionRequest(
      dto.event_id,
      dto.prediction,
      this.mapTypeModelToContract(dto.market_type),
    );

    this.predictionService.insert(request);
  }

  @Put(':id/:status')
  @HttpCode(200)
  @ApiQuery({ name: 'status', enum: StatusModel })
  update(@Query('id') id: number, @Query('status') status: StatusModel) {
    this.predictionService.updateStatus(
      id,
      this.mapStatusModelToContract(status),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number) {
    this.predictionService.delete(id);
  }

  private mapStatusModelToContract(statusModel: StatusModel): StatusContract {
    switch (statusModel) {
      case StatusModel.Win:
        return StatusContract.Win;
      case StatusModel.Lost:
        return StatusContract.Lost;
      case StatusModel.Draw:
        return StatusContract.Draw;
      case StatusModel.Unresolved:
        return StatusContract.Unresolved;
      default:
        throw new BusinessException('Mapping error - not detailed - not good');
    }
  }

  private mapStatusContractToModel(
    statusContract: StatusContract,
  ): StatusModel {
    switch (statusContract) {
      case StatusContract.Win:
        return StatusModel.Win;
      case StatusContract.Lost:
        return StatusModel.Lost;
      case StatusContract.Draw:
        return StatusModel.Draw;
      case StatusContract.Unresolved:
        return StatusModel.Unresolved;
      default:
        throw new BusinessException('Mapping error - not detailed - not good');
    }
  }

  private mapTypeModelToContract(
    modelContract: PredictionTypeModel,
  ): PredictionTypeContract {
    switch (modelContract) {
      case PredictionTypeModel.Score:
        return PredictionTypeContract.Score;
      case PredictionTypeModel.Result:
        return PredictionTypeContract.Result;
      default:
        throw new BusinessException('Mapping error - not detailed - not good');
    }
  }

  private mapTypeContractToModel(
    typeContract: PredictionTypeContract,
  ): PredictionTypeModel {
    switch (typeContract) {
      case PredictionTypeContract.Score:
        return PredictionTypeModel.Score;
      case PredictionTypeContract.Result:
        return PredictionTypeModel.Result;
      default:
        throw new BusinessException('Mapping error - not detailed - not good');
    }
  }
}
