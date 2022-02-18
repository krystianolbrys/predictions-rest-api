import { Controller, Get } from '@nestjs/common';

@Controller({
    version: '1',
    path: "predictions"
})
export class PredictionsController {
    constructor() { }

    @Get()
    getOk(): string {
        return "OK";
    }
}