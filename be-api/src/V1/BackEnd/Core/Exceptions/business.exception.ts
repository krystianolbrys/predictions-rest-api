import { HttpException } from "@nestjs/common/exceptions/http.exception";

export class BusinessException extends HttpException {
    constructor(businessErrorMessage: string) {
        super(businessErrorMessage, 400);
    }
}