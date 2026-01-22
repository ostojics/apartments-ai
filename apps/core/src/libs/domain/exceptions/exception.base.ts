export abstract class DomainException extends Error {
  constructor(
    public readonly message: string,
    public readonly code: string,
    public readonly metadata?: Record<string, any>,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

export class NotFoundDomainException extends DomainException {}
export class ConflictDomainException extends DomainException {}
export class BadRequestDomainException extends DomainException {}
export class UnauthorizedDomainException extends DomainException {}
