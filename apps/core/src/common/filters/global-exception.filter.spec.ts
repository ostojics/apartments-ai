import {GlobalExceptionFilter} from './global-exception.filter';
import {ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import {
  NotFoundDomainException,
  ConflictDomainException,
  BadRequestDomainException,
  UnauthorizedDomainException,
} from 'src/libs/domain/exceptions/exception.base';
import {ZodException} from 'src/libs/exceptions/zod.exception';

interface MockResponse {
  status: jest.Mock;
  json: jest.Mock;
}

interface MockRequest {
  url: string;
}

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter;
  let mockResponse: MockResponse;
  let mockRequest: MockRequest;
  let mockHost: ArgumentsHost;

  beforeEach(() => {
    filter = new GlobalExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockRequest = {
      url: '/test-path',
    };

    mockHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    } as unknown as ArgumentsHost;
  });

  it('should handle NotFoundDomainException correctly', () => {
    const exception = new NotFoundDomainException('Resource not found', 'NOT_FOUND', {id: '123'});

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        code: 'NOT_FOUND',
        message: 'Resource not found',
        metadata: {id: '123'},
        path: '/test-path',
      }),
    );
  });

  it('should handle ConflictDomainException correctly', () => {
    const exception = new ConflictDomainException('Resource already exists', 'CONFLICT');

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.CONFLICT,
        code: 'CONFLICT',
        message: 'Resource already exists',
      }),
    );
  });

  it('should handle BadRequestDomainException correctly', () => {
    const exception = new BadRequestDomainException('Invalid input', 'BAD_REQUEST');

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        code: 'BAD_REQUEST',
        message: 'Invalid input',
      }),
    );
  });

  it('should handle UnauthorizedDomainException correctly', () => {
    const exception = new UnauthorizedDomainException('Unauthorized access', 'UNAUTHORIZED');

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.UNAUTHORIZED,
        code: 'UNAUTHORIZED',
        message: 'Unauthorized access',
      }),
    );
  });

  it('should handle ZodError correctly', () => {
    const zodError = new ZodException('Validation failed', [
      {
        code: 'invalid_type',
        expected: 'string',
        path: ['email'],
        message: 'Expected string, received number',
      },
    ]);

    filter.catch(zodError, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
  });

  it('should handle HttpException correctly', () => {
    const exception = new HttpException('Not Found', HttpStatus.NOT_FOUND);

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.NOT_FOUND,
        code: 'HTTP_ERROR',
        message: 'Not Found',
      }),
    );
  });

  it('should handle unexpected errors correctly', () => {
    const exception = new Error('Unexpected error');
    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
      }),
    );
  });

  it('should include timestamp in response', () => {
    const exception = new NotFoundDomainException('Not found', 'NOT_FOUND');

    filter.catch(exception, mockHost);

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        timestamp: expect.any(String),
      }),
    );
  });
});
