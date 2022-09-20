import { Schema, model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userAccountSchema = new Schema({
  username: String,
  password: String
});

userAccountSchema.plugin(passportLocalMongoose);

export default model('UserAccount', userAccountSchema);
