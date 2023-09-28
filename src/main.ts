import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, VersioningType } from '@nestjs/common';

import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { AllExceptionFilter } from '@filters/all-exception.filter';

import { AppModule } from './app.module';
import { AppConfigService } from './configs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const appConfigService = app.get(AppConfigService);
  const loggerService = new Logger('NestApplication');

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  // Versioning
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  await app.listen(appConfigService.port, appConfigService.host);
  loggerService.debug(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
