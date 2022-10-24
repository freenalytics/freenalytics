import { getFormattedDate } from './date';

describe('Utils: Date', () => {
  describe('getFormattedDate()', () => {
    it('should return the correct date format.', () => {
      const date = '2022-10-23T08:52:25';
      const expected = '08:52:25 AM (23 Oct 2022)';

      expect(getFormattedDate(date, 'en')).toBe(expected);
    });
  });
});
