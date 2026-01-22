import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger} from '@nestjs/common';
import {Response, Request} from 'express';
import {ZodError} from 'zod';
import {
  DomainException,
  NotFoundDomainException,
  ConflictDomainException,
  UnauthorizedDomainException,
} from 'src/libs/domain/exceptions/exception.base';

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

    // 1. Handle Domain Exceptions
    if (exception instanceof DomainException) {
      status = this.mapDomainToHttp(exception);
      code = exception.code;
      message = exception.message;
      metadata = exception.metadata ?? {};
    }
    // 2. Handle Zod Errors (Contract Validation)
    else if (exception instanceof ZodError) {
      status = HttpStatus.BAD_REQUEST;
      code = 'VALIDATION_ERROR';
      message = 'Request validation failed';
      metadata = {
        errors: exception.errors.map((issue) => ({
          path: issue.path.join('.'),
          key: issue.message, // Your i18n key from Zod
        })),
      };
    }
    // 3. Handle NestJS standard HttpExceptions (e.g. built-in 404s)
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const nestResponse = exception.getResponse();
      code = 'HTTP_ERROR';
      if (typeof nestResponse === 'object' && nestResponse !== null && 'message' in nestResponse) {
        message = String(nestResponse.message);
      } else if (typeof nestResponse === 'string') {
        message = nestResponse;
      }
    }
    // 4. Log unexpected system errors (e.g. DB connection lost)
    else {
      const errorMessage = exception instanceof Error ? (exception.stack ?? exception.message) : String(exception);
      this.logger.error(`Unhandled Exception: ${errorMessage}`);
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      key: code,
      message: message,
      metadata: metadata,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private mapDomainToHttp(exception: DomainException): number {
    if (exception instanceof NotFoundDomainException) return HttpStatus.NOT_FOUND;
    if (exception instanceof ConflictDomainException) return HttpStatus.CONFLICT;
    if (exception instanceof UnauthorizedDomainException) return HttpStatus.UNAUTHORIZED;
    // Default for all other DomainExceptions (like BadRequestDomainException)
    return HttpStatus.BAD_REQUEST;
  }
}
