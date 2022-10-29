import { addAttachment } from './response';
import { Response } from 'express';
import { ResponseMock } from '../../__mocks__/http_mocks';

describe('Utils: Response', () => {
  let res = new ResponseMock() as unknown as Response;

  beforeEach(() => {
    res = new ResponseMock() as unknown as Response;
  });

  describe('addAttachment()', () => {
    it('should add the attachment and correct headers.', () => {
      const filename = 'file.txt';
      addAttachment(res, filename);

      expect(res.attachment).toHaveBeenCalledWith(filename);
      expect(res.setHeader).toHaveBeenCalled();
      expect((res.setHeader as jest.Mock).mock.calls[0][0]).toBe('X-Suggested-Filename');
      expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Expose-Headers', 'Content-Disposition, X-Suggested-Filename');
    });
  });
});
