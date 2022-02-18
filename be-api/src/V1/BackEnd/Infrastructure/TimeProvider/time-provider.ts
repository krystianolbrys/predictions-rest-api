import { ITimeProvider } from "./time-provider.interface";
import { DateTime } from "luxon";

export class TimeProvider implements ITimeProvider{
    getNowUTC(): Date {
        return DateTime.now().toUTC().toJSDate();
    }
}