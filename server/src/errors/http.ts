// TODO: Implement this error class.

export class HttpError extends Error {
  public readonly description: string;
  public readonly statusCode: number;

  constructor(message: string, description: string) {
    super(message);
    this.description = description;
    this.statusCode = 500;
  }
}
