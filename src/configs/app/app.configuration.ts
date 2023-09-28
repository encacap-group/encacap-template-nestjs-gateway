import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  host: process.env.APP_HOST,
  port: parseInt(process.env.PORT ?? process.env.APP_PORT, 10) ?? 3000,
}));
