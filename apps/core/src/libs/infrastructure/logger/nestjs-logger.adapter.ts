import {Injectable} from '@nestjs/common';
import {PinoLogger} from 'pino-nestjs';
import {ILoggerPort} from '../../application/ports/logger.port';

@Injectable()
export class PinoLoggerAdapter implements ILoggerPort {
  constructor(private readonly logger: PinoLogger) {}

  log(message: string, ...meta: unknown[]): void {
    this.logger.info(message, ...meta);
  }

  info(message: string, ...meta: unknown[]): void {
    this.logger.info(message, ...meta);
  }

  error(message: string, trace?: unknown, ...meta: unknown[]): void {
    this.logger.error({trace, ...meta}, message);
  }

  warn(message: string, ...meta: unknown[]): void {
    this.logger.warn(message, ...meta);
  }

  debug(message: string, ...meta: unknown[]): void {
    this.logger.debug(message, ...meta);
  }
}
