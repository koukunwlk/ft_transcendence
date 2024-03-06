import { ClassProvider } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from './user.repository';
import { InMemory } from './inMemory.repository';

export const UserRepositoryProvider: ClassProvider = {
  provide: USER_REPOSITORY_TOKEN,
  useClass: InMemory,
};
