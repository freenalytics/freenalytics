export class ResponseMock {
  public status: jest.Mock;
  public send: jest.Mock;

  constructor() {
    this.status = jest.fn(() => this);
    this.send = jest.fn();
  }
}
