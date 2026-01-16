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
