import { ResponseBuilder } from './http';
import { InternalServerError } from '../errors/http';

describe('Utils: HTTP', () => {
  describe('class ResponseBuilder', () => {
    describe('withStatusCode()', () => {
      it('should set the status code in the body.', () => {
        const builder = new ResponseBuilder().withStatusCode(100);
        expect(builder.build()).toMatchObject({ status: 100 });
      });

      it('should update the success value depending on the status in the body.', () => {
        const builder = new ResponseBuilder().withStatusCode(200);
        expect(builder.build()).toMatchObject({ success: true });

        builder.withStatusCode(400);
        expect(builder.build()).toMatchObject({ success: false });
      });
    });

    describe('withData()', () => {
      it('should set the data value in the body.', () => {
        const data = { value: 123 };
        const builder = new ResponseBuilder().withData(data);
        expect(builder.build()).toMatchObject({ data });
      });
    });

    describe('withError()', () => {
      it('should set the error value in the body.', () => {
        const error = new InternalServerError('Oops');
        const builder = new ResponseBuilder().withError(error);
        expect(builder.build()).toMatchObject({
          status: error.statusCode,
          error: {
            name: error.name,
            description: error.description,
            message: error.message
          }
        });
      });
    });

    describe('build()', () => {
      it('should set the data to null if nothing has been added into the body.', () => {
        const builder = new ResponseBuilder();
        expect(builder.build()).toMatchObject({ data: null });
      });
    });
  });
});
