import { typeOrmConfig } from './typeorm.config';
import { DataSource } from 'typeorm';

export default new DataSource({
    ...typeOrmConfig,
    entities: ['src/**/entities/*.entity.ts'],
    migrations: ['src/db/migrations/*.ts'],
    migrationsTransactionMode: 'each',
}); 
