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
import { Status } from '../BackEnd/Contracts/Prediction/Common/status';
import { PredictionRequest } from '../BackEnd/Contracts/Prediction/Request/prediction-request';
import { PredictionResponse } from '../BackEnd/Contracts/Prediction/Response/prediction-response';
import { BusinessException } from '../BackEnd/Core/Exceptions/business.exception';
import { PredictionService } from '../BackEnd/Services/Implementations/prediction.service';
import { IPredictionService } from '../BackEnd/Services/Interfaces/prediction.service.interface';
import { PredictionRequestModel } from '../Models/Requests/prediction-request.model';
import { PredictionStatusRequestModel } from '../Models/Requests/prediction-status-request.model';
import { PreditcionTypeRequestModel } from '../Models/Requests/prediction-type-request.model';
import { PreditcionResponseModel } from '../Models/Response/prediction-response.model';
import { PredictionStatusResponseModel } from '../Models/Response/prediction-status-response.model';
import { PreditcionTypeResponseModel } from '../Models/Response/prediction-type-response.model';

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
            this.mapPredictionTypeContractToResponse(model.predictionType),
            this.mapPredictionStatusContractToResponse(model.status),
          ),
      );
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
  ) {
    this.predictionService.updateStatus(
      id,
      this.mapStatusModelToStatusContract(status),
    );
  }

  private mapStatusModelToStatusContract(
    status: PredictionStatusRequestModel,
  ): Status {
    if (status == PredictionStatusRequestModel.Win) {
      return Status.Win;
    }

    if (status == PredictionStatusRequestModel.Lost) {
      return Status.Lost;
    }

    if (status == PredictionStatusRequestModel.Unresolved) {
      return Status.Unresolved;
    }

    if (status == PredictionStatusRequestModel.Draw) {
      return Status.Draw;
    }
  }

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

  private mapPredictionStatusContractToResponse(
    status: Status,
  ): PredictionStatusResponseModel {
    if (status === Status.Win) {
      return PredictionStatusResponseModel.Win;
    }

    if (status === Status.Lost) {
      return PredictionStatusResponseModel.Lost;
    }
    if (status === Status.Draw) {
      return PredictionStatusResponseModel.Draw;
    }
    if (status === Status.Unresolved) {
      return PredictionStatusResponseModel.Unresolved;
    }

    throw new BusinessException(
      `No contract translation for type ${Status[status]}`,
    );
  }

  private mapPredictionTypeContractToResponse(
    type: PredictionType,
  ): PreditcionTypeResponseModel {
    if (type === PredictionType.Result) {
      return PreditcionTypeResponseModel.Result;
    }

    if (type === PredictionType.Score) {
      return PreditcionTypeResponseModel.Score;
    }

    throw new BusinessException(
      `No contract translation for type ${PredictionType[type]}`,
    );
  }
}
