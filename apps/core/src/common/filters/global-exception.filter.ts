import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger} from '@nestjs/common';
import {Response, Request} from 'express';
import {
  DomainException,
  NotFoundDomainException,
  ConflictDomainException,
  UnauthorizedDomainException,
} from 'src/libs/domain/exceptions/exception.base';
import {ExceptionResponse} from '@acme/contracts';
import {ZodException} from 'src/libs/exceptions/zod.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_SERVER_ERROR';
    let message = 'An unexpected error occurred';
    let metadata: Record<string, unknown> = {};

    if (exception instanceof DomainException) {
      status = this.mapDomainToHttp(exception);
      code = exception.code;
      message = exception.message;
      metadata = exception.metadata ?? {};
    } else if (exception instanceof ZodException) {
      status = HttpStatus.BAD_REQUEST;
      code = 'VALIDATION_ERROR';
      message = 'Request validation failed';
      metadata = {
        errors: exception.errors.map((err) => ({path: err.path, message: err.message})),
      };
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const nestResponse = exception.getResponse();
      code = 'HTTP_ERROR';
      if (typeof nestResponse === 'object' && 'message' in nestResponse) {
        message = String(nestResponse.message);
      } else if (typeof nestResponse === 'string') {
        message = nestResponse;
      }
    }
    // 4. Log unexpected system errors
    else {
      const errorMessage = exception instanceof Error ? (exception.stack ?? exception.message) : String(exception);
      this.logger.error(`Unhandled Exception: ${errorMessage}`);
    }

    const exceptionResponse: ExceptionResponse = {
      success: false,
      statusCode: status,
      code,
      message: message,
      metadata: metadata,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    this.logger.debug(`Exception Response: ${JSON.stringify(exceptionResponse)}`);

    response.status(status).json(exceptionResponse);
  }

  private mapDomainToHttp(exception: DomainException): number {
    if (exception instanceof NotFoundDomainException) return HttpStatus.NOT_FOUND;
    if (exception instanceof ConflictDomainException) return HttpStatus.CONFLICT;
    if (exception instanceof UnauthorizedDomainException) return HttpStatus.UNAUTHORIZED;
    // Default for all other DomainExceptions (like BadRequestDomainException)
    return HttpStatus.BAD_REQUEST;
  }
}
