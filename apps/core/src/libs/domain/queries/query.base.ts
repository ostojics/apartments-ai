export class QueryBase {
  private readonly timestamp: string;

  constructor() {
    this.timestamp = new Date().toISOString();
  }
}
