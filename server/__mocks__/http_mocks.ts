export class ResponseMock {
  public status: jest.Mock;
  public send: jest.Mock;
  public attachment: jest.Mock;
  public setHeader: jest.Mock;

  constructor() {
    this.status = jest.fn(() => this);
    this.send = jest.fn();
    this.attachment = jest.fn();
    this.setHeader = jest.fn();
  }
}
