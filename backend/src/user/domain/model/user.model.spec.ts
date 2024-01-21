import { User, UserStatusEnum } from './user.model';
import { v4 as uuidV4 } from 'uuid';

describe('User', () => {
  it('should be defined', () => {
    // arrange
    const nickname = 'PaiTaOn';
    const status = UserStatusEnum.ONLINE;

    const mockedUser = {
      id: uuidV4(),
      nickname,
      status,
    };

    // act
    const user = new User(mockedUser, mockedUser.id);

    // assert
    expect(user.toJson()).toEqual(mockedUser);
  });

  it('should be defined with status online', () => {
    // arrange
    const nickname = 'PaiTaOn';
    const status = UserStatusEnum.ONLINE;

    const mockedUser = {
      id: uuidV4(),
      nickname,
      status,
    };

    // act
    const user = new User(mockedUser, mockedUser.id);

    // assert
    expect(user.getStatus()).toBe(status);
  });

  it('should be defined with status offline when status not provided', () => {
    // arrange
    const nickname = 'PaiTaOff';
    const status = UserStatusEnum.OFFLINE;

    // act
    const user = new User({ nickname });

    // assert
    expect(user.getStatus()).toBe(status);
  });
});
