import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppConfigService } from './app.service';
import appConfiguration from './app.configuration';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env.stagging', '.env.production', '.env'],
      isGlobal: true,
      load: [appConfiguration],
      validationSchema: Joi.object({
        APP_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
        APP_HOST: Joi.string().default('localhost'),
        APP_PORT: Joi.number().default(3000),
        APP_NAME: Joi.string().required(),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
