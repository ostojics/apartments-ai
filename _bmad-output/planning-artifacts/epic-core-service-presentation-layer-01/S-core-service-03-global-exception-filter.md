# Story: S-core-service-03-global-exception-filter

**Epic:** Core Service Presentation Layer
**Created:** 2026-01-22

## Objective

Implement a global exception filter for the core service and adjust domain exceptions to support standardized error handling.

## Requirements

- Implement a NestJS global exception filter (see code example below)
- Adjust domain exceptions to extend a new `DomainException` base class
- Add specific domain exception types: NotFound, Conflict, BadRequest, Unauthorized
- Ensure all modules throw domain exceptions where appropriate
- Exception filter should handle:
  - Domain exceptions (map to HTTP status)
  - Zod validation errors
  - Standard NestJS HttpExceptions
  - Unexpected system errors (log and return 500)
- Response format must include: success, statusCode, key, message, metadata, path, timestamp

## Acceptance Criteria

- Global exception filter is registered and active
- All domain exceptions extend the new base class
- All endpoints return standardized error responses
- Zod validation errors are mapped to 400 with error details
- Documentation is updated

## Example Domain Exception Base

```ts
export abstract class DomainException extends Error {
  constructor(
    public readonly message: string,
    public readonly code: string,
    public readonly metadata?: Record<string, any>,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundDomainException extends DomainException {}
export class ConflictDomainException extends DomainException {}
export class BadRequestDomainException extends DomainException {}
export class UnauthorizedDomainException extends DomainException {}
```

## Example Global Exception Filter

```ts
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
    let metadata: Record<string, any> = {};

    // 1. Handle Domain Exceptions
    if (exception instanceof DomainException) {
      status = this.mapDomainToHttp(exception);
      code = exception.code;
      message = exception.message;
      metadata = exception.metadata || {};
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
      const nestResponse = exception.getResponse() as any;
      code = 'HTTP_ERROR';
      message = typeof nestResponse === 'object' ? nestResponse.message : nestResponse;
    }
    // 4. Log unexpected system errors (e.g. DB connection lost)
    else {
      this.logger.error(`Unhandled Exception: ${exception instanceof Error ? exception.stack : exception}`);
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
```

## Example Usage

```ts
export class LicenseNotFoundError extends NotFoundDomainException {
  constructor(identifier: string) {
    super(`License "${identifier}" not found.`, LicenseErrorCode.NOT_FOUND);
  }
}

export class LicenseAlreadyUsedError extends ConflictDomainException {
  constructor(licenseKey: string) {
    super(`License "${licenseKey}" already used.`, LicenseErrorCode.ALREADY_USED);
  }
}
```
