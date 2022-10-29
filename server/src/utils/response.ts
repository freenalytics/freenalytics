import { Response } from 'express';

export const addAttachment = (res: Response, filename: string) => {
  res.attachment(filename);
  res.setHeader('X-Suggested-Filename', filename);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, X-Suggested-Filename');
};
