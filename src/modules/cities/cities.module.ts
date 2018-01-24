import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { citiesProviders } from './cities.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  modules: [DatabaseModule],
  controllers: [CitiesController],
  components: [CitiesService, ...citiesProviders]
})
export class CitiesModule {}
