import { BusinessException } from 'src/V1/BackEnd/Core/Exceptions/business.exception';
import { PredictionType as PredictionTypeContract } from 'src/V1/BackEnd/Shared/Enums/predictionType';
import { PredictionType as PredictionTypeModel } from '../Models/Shared/predictionType';
import { Status as StatusContract } from 'src/V1/BackEnd/Shared/Enums/status';
import { Status as StatusModel } from '../Models/Shared/status';

export class GatewayMapper {
  mapStatusFromModelToContract(statusModel: StatusModel): StatusContract {
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

  mapTypeFromModelToContract(
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

  mapStatusFromContractToModel(statusContract: StatusContract): StatusModel {
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

  mapTypeFromContractToModel(
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
