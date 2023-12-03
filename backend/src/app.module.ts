import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'VtV7OXWubGmFkX9BakVHGNevxM',
        database: 'transcendence',
        entities: ['dist/**/*.entity.{ts,js}'],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
