import { ClassProvider } from '@nestjs/common';
import { UserTypeOrmRepository } from './user-typeorm.repository';
import { UserRepository } from './user.repository';

export const UserRepositoryProvider: ClassProvider = {
  provide: UserRepository,
  useClass: UserTypeOrmRepository,
};
