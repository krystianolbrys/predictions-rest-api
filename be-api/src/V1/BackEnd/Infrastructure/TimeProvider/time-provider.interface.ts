import { DateTime } from "luxon";

export interface ITimeProvider{
    getNowUTC(): Date;
}