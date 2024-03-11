import { UserService } from './user.service';
import { InMemory } from '../repository/inMemory.repository';

describe('UserService', () => {
  let userService: UserService;
  let inMemoryDb: InMemory;

  beforeEach(() => {
    inMemoryDb = new InMemory();
    userService = new UserService(inMemoryDb);
  });

  it('Should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('Should insert a new user', async () => {
    // arrange
    const nickname: string = 'LeeroyJenkins';

    // act
    await userService.insertUser(nickname);

    // assert
    expect(inMemoryDb.getSize()).toEqual(1);
  });

  it('Do not insert duplicated user', async () => {
    //arrange
    const nickname: string = 'NoobMaster69';

    //act
    await userService.insertUser(nickname);

    const f = async () => {
      await userService.insertUser(nickname);
    };

    //assert
    expect(f).rejects.toThrow(`nickname: ${nickname} already exists`);
  });
});
