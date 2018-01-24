import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './modules/app.module';
import initServer from './server.config';

(async () => {
  const app = await NestFactory.create(ApplicationModule);
  // Config server & init swagger
  initServer(app);
  // 🚀 Start the application 🚀
  await app.listen(parseInt(process.env.PORT, 10) || 3001);
})();
