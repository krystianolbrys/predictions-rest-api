export class PredictionDto {
  id: number;
  eventId: number;
  isSoftDeleted: boolean;
  predictionValue: string;
  predictionType: string;
  status: string;
  creationDate: Date;
  modificationDate: Date;
}
