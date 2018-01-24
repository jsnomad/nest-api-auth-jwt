import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { ValidationPipe } from '../src/modules/common/pipes/validation.pipe';
import * as morgan from 'morgan';

export default app => {
  const basePath = '/api/v1';
  // Add various HTTP headers to secure the app
  app.use(helmet());
  // Enable CORS
  app.use(cors());
  app.use(morgan('dev'));
  // Add prefix
  app.setGlobalPrefix(basePath);
  app.useGlobalPipes(new ValidationPipe());
  // Swagger Configuration
  const options = new DocumentBuilder()
    .setTitle('Cities API')
    .setDescription('A simple API using Nest')
    .setVersion('1.0')
    .addTag('cities')
    .addBearerAuth('Authorization', 'header')
    .setBasePath(basePath)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
};
