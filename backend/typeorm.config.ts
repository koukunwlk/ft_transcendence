import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

export const typeOrmConfig: DataSourceOptions = {
  entities: [__dirname + '/**/*entity.{js,ts}'],
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'VtV7OXWubGmFkX9BakVHGNevxM',
  database: 'transcendence',
  migrations: ['migrations/*.{ts,js}'],
  synchronize: true,
};
