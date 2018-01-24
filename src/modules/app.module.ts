import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  modules: [AuthModule, CitiesModule]
})
export class ApplicationModule {}
