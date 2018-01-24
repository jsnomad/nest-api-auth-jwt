import * as mongoose from 'mongoose';

const server = process.env.MONGO_SERVER || 'localhost';
const collection = process.env.MONGO_COLLECTION || 'city-api';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<mongoose.Connection> => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect(`mongodb://${server}/${collection}`, {
        useMongoClient: true
      });
    }
  }
];
