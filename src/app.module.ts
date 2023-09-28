import { Module } from '@nestjs/common';

import { AppConfigModule } from '@configs/app/app.module';

import { HomeModule } from './modules';

@Module({
  imports: [AppConfigModule, HomeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
