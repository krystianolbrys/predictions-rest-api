import { HttpException } from '@nestjs/common/exceptions/http.exception';

export class PersistenceException extends HttpException {
  constructor(persistenceErrorMessage: string) {
    super(persistenceErrorMessage, 404);
  }
}
