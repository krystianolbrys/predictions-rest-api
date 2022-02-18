import { Controller, Get, Inject } from '@nestjs/common';
import { PredictionService } from '../BackEnd/Services/Implementations/prediction.service';
import { IPredictionService } from '../BackEnd/Services/Interfaces/prediction.service.interface';

@Controller({
    version: '1',
    path: "predictions"
})
export class PredictionsController {
    constructor(
        @Inject(PredictionService) private readonly predictionService: IPredictionService) {

    }

    @Get()
    getOk(): string {
        return this.predictionService.getOkMessage();
    }
}