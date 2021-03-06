import { PredictionType } from 'src/V1/BackEnd/Shared/Enums/predictionType';

export class PredictionRequest {
  readonly predictionType: PredictionType;
  readonly eventId: number;
  readonly predictionString: string;

  constructor(
    eventId: number,
    predictionString: string,
    predictionType: PredictionType,
  ) {
    this.eventId = eventId;
    this.predictionString = predictionString;
    this.predictionType = predictionType;
  }
}
