import { Connection } from 'mongoose';
import { CitySchema } from './schemas/city.schema';

export const citiesProviders = [
  {
    provide: 'CityModelToken',
    useFactory: (connection: Connection) =>
      connection.model('City', CitySchema),
    inject: ['DbConnectionToken']
  }
];
