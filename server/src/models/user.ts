import { PassportLocalDocument, PassportLocalModel, PassportLocalSchema, Schema, model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface UserJwtPayload {
  id: string
  username: string
  createdAt: string
  locale: string
}

export interface UserModel extends PassportLocalDocument {
  _id: string
  username: string
  createdAt: string
  locale: string
}

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  locale: {
    type: String,
    required: true
  }
}) as PassportLocalSchema<UserModel, any>;

userSchema.plugin(passportLocalMongoose);

export default model<UserModel>('User', userSchema) as PassportLocalModel<UserModel>;
