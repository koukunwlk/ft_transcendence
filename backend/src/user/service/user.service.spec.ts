import { UserService } from './user.service';
import { InMemory } from '../repository/inMemory.repository';

describe('UserService', () => {
  let userService: UserService
  let inMemoryDb: InMemory
  beforeEach(() => {
    inMemoryDb = new InMemory()
    userService = new UserService(inMemoryDb)
  })
  it("Should be defined", () => {
    expect(userService).toBeDefined()
  })
  it("Should insert a new user", () => {
    // arrange
    let nickname: string = "ArnaldoCoelho"

    // act
    userService.insertUser(nickname)

    // assert
    expect(inMemoryDb.getSize()).toEqual(1)
  })
});
