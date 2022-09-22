import { Schema, model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface UserJwtPayload {
  id: string
  username: string
  createdAt: string
  locale: string
}

export interface UserModel {
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
});

userSchema.plugin(passportLocalMongoose);

// TODO: Better typing
export default model('User', userSchema) as any;
