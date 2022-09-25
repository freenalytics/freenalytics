import { UserLoginSchema, UserLoginBody, UserRegisterSchema, UserRegisterBody } from './user';

describe('Schemas: User', () => {
  describe('UserLoginSchema', () => {
    const validUser: UserLoginBody = {
      username: 'moonstar',
      password: 'Abc12345!'
    };

    describe('username', () => {
      it('should error if no username exists.', () => {
        const userCopy: Partial<UserLoginBody> = { ...validUser };
        delete userCopy.username;

        const validation = UserLoginSchema.validate(userCopy);
        expect(validation.error).toBeTruthy();
      });

      it('should not error if username is valid.', () => {
        const validation = UserLoginSchema.validate(validUser);
        expect(validation.error).toBeFalsy();
      });
    });

    describe('password', () => {
      it('should error if no password exists.', () => {
        const userCopy: Partial<UserLoginBody> = { ...validUser };
        delete userCopy.password;

        const validation = UserLoginSchema.validate(userCopy);
        expect(validation.error).toBeTruthy();
      });

      it('should not error if password is valid.', () => {
        const validation = UserLoginSchema.validate(validUser);
        expect(validation.error).toBeFalsy();
      });
    });
  });

  describe('UserRegisterSchema', () => {
    const validUser: UserRegisterBody = {
      username: 'moonstar',
      password: 'Abc12345!',
      locale: 'en'
    };

    describe('username', () => {
      it('should error if length is inferior to 3 or greater than 20.', () => {
        const firstValidation = UserRegisterSchema.validate({ ...validUser, username: 'ab' });
        expect(firstValidation.error).toBeTruthy();

        const secondValidation = UserRegisterSchema.validate({ ...validUser, username: 'abcdefghijklmnopqrstuvwxyz' });
        expect(secondValidation.error).toBeTruthy();
      });

      it('should error if illegal characters are included.', () => {
        const validation = UserRegisterSchema.validate({ ...validUser, username: '@what!?' });
        expect(validation.error).toBeTruthy();
      });

      it('should error if no username exists.', () => {
        const userCopy: Partial<UserRegisterBody> = { ...validUser };
        delete userCopy.username;

        const validation = UserRegisterSchema.validate(userCopy);
        expect(validation.error).toBeTruthy();
      });

      it('should not error if username is valid.', () => {
        const validation = UserRegisterSchema.validate(validUser);
        expect(validation.error).toBeFalsy();
      });
    });

    describe('password', () => {
      it('should error if length is inferior to 8.', () => {
        const validation = UserRegisterSchema.validate({ ...validUser, password: 'pass' });
        expect(validation.error).toBeTruthy();
      });

      it('should error if there is no special characters.', () => {
        const validation = UserRegisterSchema.validate({ ...validUser, password: 'Abc123451' });
        expect(validation.error).toBeTruthy();
      });

      it('should error if there is no lowercase letters.', () => {
        const validation = UserRegisterSchema.validate({ ...validUser, password: 'ABC12345!' });
        expect(validation.error).toBeTruthy();
      });

      it('should error if there is no uppercase letters.', () => {
        const validation = UserRegisterSchema.validate({ ...validUser, password: 'abc12345!' });
        expect(validation.error).toBeTruthy();
      });

      it('should error if there is spaces.', () => {
        const validation = UserRegisterSchema.validate({ ...validUser, password: 'Abc 12345!' });
        expect(validation.error).toBeTruthy();
      });

      it('should error if no password exists.', () => {
        const userCopy: Partial<UserRegisterBody> = { ...validUser };
        delete userCopy.password;

        const validation = UserRegisterSchema.validate(userCopy);
        expect(validation.error).toBeTruthy();
      });

      it('should not error if password is valid.', () => {
        const validation = UserRegisterSchema.validate(validUser);
        expect(validation.error).toBeFalsy();
      });
    });

    describe('locale', () => {
      it('should error if locale is not valid.', () => {
        const validation = UserRegisterSchema.validate({ ...validUser, locale: 'my_locale' });
        expect(validation.error).toBeTruthy();
      });

      it('should error if no locale exists.', () => {
        const userCopy: Partial<UserRegisterBody> = { ...validUser };
        delete userCopy.locale;

        const validation = UserRegisterSchema.validate(userCopy);
        expect(validation.error).toBeTruthy();
      });

      it('should not error if locale is valid.', () => {
        const validation = UserRegisterSchema.validate(validUser);
        expect(validation.error).toBeFalsy();
      });
    });
  });
});
