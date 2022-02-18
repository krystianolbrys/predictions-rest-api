import { Inject } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { BusinessException } from "../../Core/Exceptions/business.exception";
import { Prediction } from "../../Core/Model/prediction.abstract";
import { ScorePrediction } from "../../Core/Model/score-prediction";
import { ScorePredictionStringValidator } from "../../Core/Validators/scorePredictionStringValidator";
import { TimeProvider } from "../../Infrastructure/TimeProvider/time-provider";
import { ITimeProvider } from "../../Infrastructure/TimeProvider/time-provider.interface";
import { IPredictionService } from "../Interfaces/prediction.service.interface";

@Injectable()
export class PredictionService implements IPredictionService {

    constructor(@Inject(TimeProvider) private readonly timeProvider: ITimeProvider){
        
    }

    getPrediction(): Prediction {
        let scoreValidator = new ScorePredictionStringValidator();

        let scorePrediction: Prediction =
            new ScorePrediction(1, 2, "3:5", scoreValidator, this.timeProvider.getNowUTC(), this.timeProvider.getNowUTC());

        return scorePrediction;
    }

    getBusinessError(): void {
        throw new BusinessException("getBusinessErrorExmaple")
    }

    getOkMessage(): string {
        return "OkFromService";
    }
}