import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
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
