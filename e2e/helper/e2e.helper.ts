import * as request from 'supertest';
import { UserSchema } from '../../src/modules/auth/schemas/user.schema';

export async function GetToken(server, user) {
  const response = await request(server)
    .post('/api/v1/auth/login')
    .send(user);
  return response.body.access_token;
}

export async function InitDb(mongoose) {
  const server = process.env.MONGO_SERVER || 'localhost';
  const collection = process.env.MONGO_COLLECTION || 'city-api';
  mongoose.connect(`mongodb://${server}/${collection}`, {
    useMongoClient: true
  });
}

export async function CreateFakeUser(mongoose, user) {
  const User = mongoose.model('User', UserSchema);
  await new User(user).save();
}

export async function CleanFakeUser(mongoose, user) {
  const User = mongoose.model('User', UserSchema);
  await User.find({ email: user.email })
    .remove()
    .exec();
}
