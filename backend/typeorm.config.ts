import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config({ path: '../.env' });

export const typeOrmConfig: DataSourceOptions = {
  entities: [__dirname + '/**/*entity.{js,ts}'],
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE,
  migrations: ['migrations/*.{ts,js}'],
  synchronize: true,
};
