import { ITimeProvider } from "./time-provider.interface";

export class TimeProvider implements ITimeProvider{
    getNowUTC(): Date {
        return new Date(); // update with luxon
    }
}