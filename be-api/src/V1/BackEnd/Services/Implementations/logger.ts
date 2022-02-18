import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from '../../Core/Interfaces/logger.interface';

// dummy logger for Ports and Adapters like approach
@Injectable()
export default class DummyConsoleLogger implements ILogger {
  constructor(private readonly logger: Logger) {}
  log(message: string): void {
    this.logger.log(message);
  }
}
