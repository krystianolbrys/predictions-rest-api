import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BusinessException } from "../../Core/Exceptions/business.exception";
import { IPredictionService } from "../Interfaces/prediction.service.interface";

@Injectable()
export class PredictionService implements IPredictionService {

    getBusinessError(): void {
        throw new BusinessException("getBusinessErrorExmaple")
    }

    getOkMessage(): string {
        return "OkFromService";
    }
}